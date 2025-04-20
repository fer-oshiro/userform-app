import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './index'

describe('Buttonhaq', () => {
  it('renderiza o botão com texto', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Salvar')
  })

  it('dispara o evento de clique quando habilitado', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Enviar</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('não dispara clique quando desabilitado', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Desabilitado
      </Button>
    )

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('aplica loading visual e esconde o texto', () => {
    render(<Button isLoading>Carregando</Button>)
    const button = screen.getByRole('button')

    const span = button.querySelector('span')
    expect(span).toHaveStyle('visibility: hidden')

    expect(button.className).toMatch(/loading/)
  })

  it('usa atributo disabled quando isLoading está ativo', () => {
    render(<Button isLoading>Processando</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('aplica estilo fullWidth quando prop é passada', () => {
    render(<Button isFullWidth>Expandido</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toMatch(/fullWidth/)
  })
})
