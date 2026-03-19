export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  prefix?: string
  size?: number | string
}

/**
 * SVG图标组件
 * 只能引用/assets/svg-ico目录下的svg文件
 * @param props
 * @returns
 */
const SvgIco: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  const { name, prefix = 'icon', size, ...rest } = props
  const symbolId = `#icon-${prefix}-${name}`

  const sizeStyle = size ? { width: size, height: size } : {}

  return (
    <div style={sizeStyle} className="flex items-center justify-center">
      <svg aria-hidden="true" className="w-full h-full" {...rest}>
        <use href={symbolId} />
      </svg>
    </div>
  )
}

export default SvgIco
