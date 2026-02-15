<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

</head>
<body>

<h1>📌 Smart Bookmark App</h1>

<p>
A realtime, user-private bookmark manager built with <strong>Next.js (App Router)</strong>
and <strong>Supabase</strong>, featuring <strong>Google OAuth authentication</strong>,
<strong>row-level security</strong>, and <strong>live updates</strong>.
</p>

<hr />

<h2>🔗 Live Demo</h2>
<p>
<strong>Vercel URL:</strong><br />
<em>https://your-vercel-app-url.vercel.app</em>
</p>
<p>
The app can be tested by logging in with any Google account.
</p>

<hr />

<h2>📂 GitHub Repository</h2>
<p>
<strong>Public Repo:</strong><br />
<em>https://github.com/Ratankumar27/smart-bookmark-app</em>
</p>

<hr />

<h2>✅ Features (Mapped to Requirements)</h2>

<h3>1️⃣ Google Authentication</h3>
<ul>
  <li>Users can sign up and log in using <strong>Google OAuth only</strong></li>
  <li>Implemented using <strong>Supabase Auth</strong></li>
  <li>No email/password login supported</li>
</ul>

<h3>2️⃣ Add Bookmarks</h3>
<ul>
  <li>Logged-in users can add bookmarks with:</li>
  <ul>
    <li>URL</li>
    <li>Title</li>
  </ul>
</ul>

<h3>3️⃣ User-Private Bookmarks</h3>
<ul>
  <li>Each user can only see their own bookmarks</li>
  <li>Enforced using <strong>Supabase Row Level Security (RLS)</strong></li>
  <li><code>user_id</code> column is used to scope data per user</li>
</ul>

<h3>4️⃣ Realtime Updates</h3>
<ul>
  <li>Bookmark list updates in <strong>real time</strong></li>
  <li>Opening the app in two tabs reflects instant updates</li>
  <li>Implemented using <strong>Supabase Realtime (postgres_changes)</strong></li>
</ul>

<h3>5️⃣ Delete Own Bookmarks</h3>
<ul>
  <li>Users can delete only their own bookmarks</li>
  <li>Protected using RLS delete policy:</li>
</ul>

<pre><code>auth.uid() = user_id</code></pre>

<h3>6️⃣ Deployed on Vercel</h3>
<ul>
  <li>Application is deployed on <strong>Vercel</strong></li>
  <li>Environment variables are securely configured</li>
</ul>

<hr />

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js (App Router)</li>
  <li><strong>Backend:</strong> Supabase</li>
  <li><strong>Authentication:</strong> Google OAuth (Supabase Auth)</li>
  <li><strong>Database:</strong> PostgreSQL (with RLS)</li>
  <li><strong>Realtime:</strong> Supabase Realtime</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Deployment:</strong> Vercel</li>
</ul>

<hr />

<h2>📁 Project Structure</h2>

<pre><code>
app/
 ├─ page.tsx              # Main UI (bookmarks, auth, realtime)
 ├─ auth/callback/        # OAuth callback handling
lib/
 ├─ supabaseClient.ts     # Supabase client setup
</code></pre>

<hr />

<h2>⚙️ Environment Variables</h2>

<p>Create a <code>.env.local</code> file:</p>

<pre><code>
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
</code></pre>

<p>
<strong>Note:</strong> <code>.env.local</code> is ignored using <code>.gitignore</code>.
</p>

<hr />

<h2>▶️ Running the Project Locally</h2>

<pre><code>
npm install
npm run dev
</code></pre>

<p>Open: <strong>http://localhost:3000</strong></p>

<hr />

<h2>🔐 Database & Security</h2>

<h3>Bookmarks Table</h3>
<ul>
  <li>id (uuid)</li>
  <li>user_id (uuid)</li>
  <li>title (text)</li>
  <li>url (text)</li>
  <li>created_at (timestamp)</li>
</ul>

<h3>Row Level Security Policies</h3>
<ul>
  <li><strong>SELECT:</strong> Users can read only their bookmarks</li>
  <li><strong>INSERT:</strong> Users can insert bookmarks with their own user_id</li>
  <li><strong>DELETE:</strong> Users can delete only their own bookmarks</li>
</ul>

<hr />

<h2>🧠 Challenges Faced & Solutions</h2>

<h3>❌ Issue 1: Bookmarks visible across users</h3>
<p>
<strong>Solution:</strong><br />
Implemented RLS with <code>auth.uid() = user_id</code>.
</p>

<h3>❌ Issue 2: Realtime updates triggering for all users</h3>
<p>
<strong>Solution:</strong><br />
Scoped realtime subscriptions using:
</p>

<pre><code>
filter: `user_id=eq.${user.id}`
</code></pre>

<h3>❌ Issue 3: Delete button not working</h3>
<p>
<strong>Cause:</strong> Missing or incorrect DELETE policy.
</p>
<p>
<strong>Solution:</strong>
</p>

<pre><code>
USING (auth.uid() = user_id)
</code></pre>

<h3>❌ Issue 4: OAuth redirect errors</h3>
<p>
<strong>Solution:</strong><br />
Configured Google OAuth redirect URLs correctly in Supabase
and handled callback route in Next.js.
</p>

<hr />

<h2>🎯 Final Outcome</h2>
<ul>
  <li>Fully functional app matching all requirements</li>
  <li>Secure, realtime, and user-scoped</li>
  <li>Production-ready deployment</li>
  <li>Clean and maintainable codebase</li>
</ul>

<hr />

<h2>👨‍💻 Author</h2>
<p>
<strong>Ratan Kumar Jorapur</strong><br />
📧 ratankumarjorapur@gmail.com
</p>

<hr />

<h2>✅ Submission Checklist</h2>
<ul>
  <li>✔ Live Vercel URL</li>
  <li>✔ Public GitHub repository</li>
  <li>✔ README with explanation and challenges</li>
  <li>✔ Google OAuth working</li>
  <li>✔ Realtime updates verified</li>
</ul>

</body>
</html>

