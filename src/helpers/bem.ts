type Mods = { [key: string]: any }
type CSS = { [key: string]: string }

export const block = (blockName: string, css: CSS) => {
  return (elementOrMods?: string | Mods, modsList?: Mods): string => {
    const classList = []
    const element = typeof elementOrMods === 'string' && elementOrMods
    const mods = typeof elementOrMods === 'object' ? elementOrMods : modsList
    const baseClass = element ? `${blockName}__${element}` : `${blockName}`

    classList.push(css[baseClass])
    if (mods) {
      for (const m in mods) {
        if (mods[m]) {
          if (typeof mods[m] === 'string') {
            classList.push(css[`${baseClass}_${m}_${mods[m]}`])
          } else {
            classList.push(css[`${baseClass}_${m}`])
          }
        }
      }
    }

    return classList.join(' ')
  }
}
