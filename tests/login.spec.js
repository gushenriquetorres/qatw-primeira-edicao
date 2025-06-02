// @ts-check
import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';

test('Não deve logar quando o código de autenticacao for inválido', async ({ page }) => {
const loginPage = new LoginPage(page);

  const usuario = {
    cpf: '00000014141',
    senha: '147258',
  }

  loginPage.navegarPagina()
  loginPage.preencherCPF(usuario.cpf);
  loginPage.preencherSenha(usuario.senha);

  // Temporário
  await page.waitForTimeout(3000);

  const codigo = await obterCodigo2FA();
  loginPage.preencher2FA('000000');

  await page.waitForTimeout(2000);

  expect(await page.getByText('Código inválido. Por favor, tente novamente.')).toBeVisible();
});

test('Deve acessar a conta do usuário', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const usuario = {
    cpf: '00000014141',
    senha: '147258',
  }

  loginPage.navegarPagina()
  loginPage.preencherCPF(usuario.cpf);
  loginPage.preencherSenha(usuario.senha);

  // Temporário
  await page.waitForTimeout(3000);

  const codigo = await obterCodigo2FA();
  loginPage.preencher2FA(codigo);

  await page.waitForTimeout(2000);

  expect(await loginPage.obterSaldo()).toHaveText('R$ 5.000,00');
});
