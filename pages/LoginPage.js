export class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async navegarPagina() {
    await this.page.goto('http://paybank-mf-auth:3000/');
  }

  async preencherCPF(cpf) {
    await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async preencherSenha(senha) {
    for (const digito of senha) {
      await this.page.getByRole('button', { name: digito }).click();
  }
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async preencher2FA(codigo) {
    await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
    await this.page.getByRole('button', { name: 'Verificar' }).click();
  }

  async obterSaldo() {
    return this.page.locator('#account-balance');
  }
}