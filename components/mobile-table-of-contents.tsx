type Section = {
  id: string
  title: string
}

export default function MobileTableOfContents({ sections }: { sections: Section[] }) {
  return (
    <details className="mb-8 rounded-fui-lg border border-border bg-card md:hidden">
      <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fui-primary">
        Jump to a section
      </summary>
      <nav className="border-t border-border px-2 py-2" aria-label="Case study sections">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex min-h-11 items-center rounded-fui px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  )
}
