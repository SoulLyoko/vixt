import { Link } from 'react-router'

export default function TheFooter() {
  const [isDark, toggleDark] = useDark()
  return (
    <nav flex gap-4 justify-center mt-6 text-xl>
      <Link icon-btn to="/" title="Home">
        <Icon icon="carbon:campsite" />
      </Link>

      <button icon-btn title="ToggleDark" onClick={() => toggleDark()}>
        <Icon icon={isDark ? 'carbon:sun' : 'carbon:moon'} />
      </button>

      <a icon-btn rel="noreferrer" href="https://github.com/SoulLyoko/vixt" target="_blank" title="GitHub">
        <Icon icon="carbon:logo-github" />
      </a>

      <Link icon-btn to="/about" title="About">
        <Icon icon="carbon:dicom-overlay" />
      </Link>
    </nav>
  )
}
