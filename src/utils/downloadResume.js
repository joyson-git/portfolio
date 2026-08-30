/**
 * Synchronously triggers a download/open for Joyson's resume.
 */
export function downloadResumePDF() {
  const link = document.createElement('a')
  link.href = '/Joyson_Pinto_FullStackDeveloper_Resume.pdf'
  link.download = 'Joyson_Pinto_FullStackDeveloper_Resume.pdf'
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
