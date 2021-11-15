import type {} from 'styled-components/cssprop'

declare global {
  type Svg = React.SVGProps<SVGSVGElement> & { title?: string };
}
