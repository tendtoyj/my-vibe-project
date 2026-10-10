/** "조깅" + 이/가 → "조깅이", "요가" → "요가가". 한글이 아닌 끝글자는 '이'로 처리 */
export function withIGa(name: string): string {
  const last = name.trim().slice(-1)
  const code = last.charCodeAt(0)
  if (code >= 0xac00 && code <= 0xd7a3) {
    return name + ((code - 0xac00) % 28 === 0 ? '가' : '이')
  }
  return name + '이'
}
