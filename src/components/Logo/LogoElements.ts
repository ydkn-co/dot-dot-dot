import { ReactComponent as Logo } from '~/assets/logo-line.svg'
import styled from '~/styled'

export const Wrapper = styled.div`
  align-items: center;
  display: grid;
  gap: 30px;
  grid-auto-flow: column;
  grid-template-columns: 200px max-content 200px max-content 200px;
`
Wrapper.displayName = 'Logo.Wrapper'

export const Bullet = styled.div`
  background: var(--ddd-blue);
  height: 20px;
  width: 20px;
`
Bullet.displayName = 'Logo.Bullet'

export const Dot = styled(Logo)`
  height: auto;
  width: 100%;
`
Dot.displayName = 'Logo.Dot'
