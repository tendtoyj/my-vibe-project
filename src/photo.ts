// 사진 처리: 촬영 날짜 읽기(EXIF)와 작게 줄이기. 외부 라이브러리 없이 직접 읽는다.

const THUMB = 320

/** JPEG 안의 촬영 날짜를 'YYYY-MM-DD'로. 없거나 읽지 못하면 null */
export async function readShotDate(file: File): Promise<string | null> {
  try {
    const v = new DataView(await file.slice(0, 256 * 1024).arrayBuffer())
    if (v.getUint16(0) !== 0xffd8) return null
    let off = 2
    while (off + 4 < v.byteLength) {
      const marker = v.getUint16(off)
      if ((marker & 0xff00) !== 0xff00 || marker === 0xffda) break
      const len = v.getUint16(off + 2)
      if (marker === 0xffe1 && v.getUint32(off + 4) === 0x45786966) return parseTiff(v, off + 10)
      off += 2 + len
    }
  } catch {
    /* 날짜를 못 읽으면 없는 걸로 */
  }
  return null
}

function parseTiff(v: DataView, base: number): string | null {
  const little = v.getUint16(base) === 0x4949
  const g16 = (o: number) => v.getUint16(o, little)
  const g32 = (o: number) => v.getUint32(o, little)

  const find = (ifd: number, tag: number): number | null => {
    const n = g16(ifd)
    for (let i = 0; i < n; i++) {
      const e = ifd + 2 + i * 12
      if (g16(e) === tag) return e
    }
    return null
  }
  const ascii = (e: number): string => {
    const count = g32(e + 4)
    const start = count > 4 ? base + g32(e + 8) : e + 8
    let s = ''
    for (let i = 0; i < count - 1; i++) s += String.fromCharCode(v.getUint8(start + i))
    return s
  }
  const toYmd = (s: string): string | null => {
    const m = /^(\d{4}):(\d{2}):(\d{2})/.exec(s)
    if (!m || m[1] === '0000' || m[2] === '00' || m[3] === '00') return null
    return `${m[1]}-${m[2]}-${m[3]}`
  }

  const ifd0 = base + g32(base + 4)
  const exifPtr = find(ifd0, 0x8769)
  if (exifPtr !== null) {
    const exif = base + g32(exifPtr + 8)
    for (const tag of [0x9003, 0x9004]) {
      const e = find(exif, tag)
      if (e !== null) {
        const d = toYmd(ascii(e))
        if (d) return d
      }
    }
  }
  const e0 = find(ifd0, 0x0132)
  return e0 !== null ? toYmd(ascii(e0)) : null
}

/** 칸에 들어갈 정사각 썸네일(JPEG data URL) */
export async function makeThumb(file: File): Promise<string> {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const side = Math.min(bmp.width, bmp.height)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = THUMB
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas')
  ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, THUMB, THUMB)
  bmp.close()
  return canvas.toDataURL('image/jpeg', 0.8)
}
