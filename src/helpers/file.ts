import { compressAccurately, compressAccuratelyConfig } from 'image-conversion'

export const createObjectURL = (file?: File | null): string | null => {
  if (file) {
    return URL.createObjectURL(file)
  }

  return null
}

export const readFile = (file: Blob) => {
  const reader = new FileReader()

  const result = new Promise((resolve, reject) => {
    reader.onload = (): void => {
      if (typeof reader.result !== 'string') {
        reject((error: any) => console.error(error))
        return
      }

      const position = reader.result.indexOf(';base64')

      resolve('data:image/jpeg' + reader.result.slice(position))
    }
  })

  reader.readAsDataURL(file)

  return result
}

export const compressImage = async (image: Blob | null, compressedSize = 400) => {
  if (image) {
    const convertedImage: Blob = await compressAccurately(image, {
      type: 'image/jpeg',
    } as compressAccuratelyConfig)

    const compressedImage: Blob = await compressAccurately(image, {
      size: compressedSize,
      type: 'image/jpeg',
    } as compressAccuratelyConfig)

    const base64Image = await readFile(convertedImage)
    const base64CompressedImage = await readFile(compressedImage)

    return [base64Image, base64CompressedImage]
  }
}
