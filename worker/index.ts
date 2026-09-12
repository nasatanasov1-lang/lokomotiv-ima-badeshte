export interface Env {
  ASSETS: Fetcher
  VOICES_DB: D1Database
  ADMIN_PASSWORD: string
}

type Submission = {
  id: number
  name: string
  role: string
  answer: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const MAX_NAME = 80
const MAX_ROLE = 120
const MAX_ANSWER = 600

async function ensureSchema(db: D1Database) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS voice_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        answer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    )
    .run()
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

function isAdmin(request: Request, env: Env): boolean {
  const key = request.headers.get('x-admin-key')
  return !!env.ADMIN_PASSWORD && key === env.ADMIN_PASSWORD
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const { pathname } = url

    if (!pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request)
    }

    try {
      await ensureSchema(env.VOICES_DB)

      // Public: list approved voices
      if (pathname === '/api/voices' && request.method === 'GET') {
        const { results } = await env.VOICES_DB.prepare(
          `SELECT id, name, role, answer FROM voice_submissions WHERE status = 'approved' ORDER BY created_at DESC LIMIT 100`,
        ).all<Pick<Submission, 'id' | 'name' | 'role' | 'answer'>>()
        return json({ voices: results })
      }

      // Public: submit a new voice (goes to pending)
      if (pathname === '/api/voices' && request.method === 'POST') {
        const body = await request.json<Record<string, unknown>>().catch(() => null)
        if (!body) return json({ error: 'invalid_json' }, 400)

        // Honeypot: bots tend to fill every field, humans never see/fill this one
        if (typeof body.website === 'string' && body.website.trim() !== '') {
          // Pretend success so bots don't learn anything, but do not insert.
          return json({ ok: true })
        }

        const name = String(body.name ?? '').trim().slice(0, MAX_NAME)
        const role = String(body.role ?? '').trim().slice(0, MAX_ROLE)
        const answer = String(body.answer ?? '').trim().slice(0, MAX_ANSWER)

        if (!name || !role || !answer) {
          return json({ error: 'missing_fields' }, 400)
        }

        await env.VOICES_DB.prepare(
          `INSERT INTO voice_submissions (name, role, answer, status) VALUES (?, ?, ?, 'pending')`,
        )
          .bind(name, role, answer)
          .run()

        return json({ ok: true })
      }

      // Everything below is admin-only
      if (pathname.startsWith('/api/admin/')) {
        if (!isAdmin(request, env)) {
          return json({ error: 'unauthorized' }, 401)
        }

        if (pathname === '/api/admin/voices' && request.method === 'GET') {
          const { results } = await env.VOICES_DB.prepare(
            `SELECT * FROM voice_submissions ORDER BY
               CASE status WHEN 'pending' THEN 0 ELSE 1 END, created_at ASC`,
          ).all<Submission>()
          return json({ voices: results })
        }

        const actionMatch = pathname.match(/^\/api\/admin\/voices\/(\d+)\/(approve|reject|delete)$/)
        if (actionMatch && request.method === 'POST') {
          const id = Number(actionMatch[1])
          const action = actionMatch[2]
          if (action === 'delete') {
            await env.VOICES_DB.prepare(`DELETE FROM voice_submissions WHERE id = ?`).bind(id).run()
          } else {
            const status = action === 'approve' ? 'approved' : 'rejected'
            await env.VOICES_DB.prepare(`UPDATE voice_submissions SET status = ? WHERE id = ?`)
              .bind(status, id)
              .run()
          }
          return json({ ok: true })
        }
      }

      return json({ error: 'not_found' }, 404)
    } catch (err) {
      console.error(err)
      return json({ error: 'server_error' }, 500)
    }
  },
} satisfies ExportedHandler<Env>
