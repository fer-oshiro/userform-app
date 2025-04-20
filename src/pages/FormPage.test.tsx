import { render, screen } from "@testing-library/react";
import { FormPage } from "./FormPage";

describe("FormPage", () => {
  it("renderiza o texto corretamente", () => {
    render(<FormPage />);
    expect(screen.getByText("Formulário")).toBeInTheDocument();
  });

  it("não exibe a mensagem de erro inicialmente", () => {
    render(<FormPage />);
    expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();
  });
});
