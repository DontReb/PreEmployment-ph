import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <title>Page not found · PreEmployment.ph</title>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 text-ink-muted">This link may be old or mistyped.</p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-semibold text-on-accent transition hover:brightness-110 active:brightness-95"
      >
        Go to the home page
      </Link>
    </section>
  )
}

export default NotFoundPage
