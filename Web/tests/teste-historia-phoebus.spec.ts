import { test, expect } from '@playwright/test';

test.describe('Teste de seleção de anos - Linha do tempo Phoebus', () => {
  const anos = ['2017', '2018', '2021'];
  let urlEsperada: string;


  test.afterEach(async ({ page }, testInfo) => {
    const nomeArquivo = testInfo.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/[^a-z0-9]+/g, '-');

    const titulo = page.getByText('Nossa História').first();

    let box = await page.locator('section', { has: titulo }).first().boundingBox().catch(() => null);

    if (!box) {
      const boxTitulo = await titulo.boundingBox();
      if (boxTitulo) {
        box = {
          x: Math.max(boxTitulo.x - 150, 0),
          y: Math.max(boxTitulo.y - 20, 0),
          width: 1000,
          height: 650,
        };
      }
    }

    const opcoesPrint = box ? { clip: box } : { fullPage: true };

    const print = await page.screenshot(opcoesPrint);
    await testInfo.attach(`${nomeArquivo}-${testInfo.status}`, {
      body: print,
      contentType: 'image/png',
    });

    await page.screenshot({
      path: `evidencias/${nomeArquivo}-${testInfo.status}.png`,
      ...opcoesPrint,
    });
  });

  test.beforeEach(async ({ page }) => {
    await test.step('Abre o site e prepara a página', async () => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/', { waitUntil: 'load' });
      await page.waitForTimeout(3000);

      await page.evaluate(() => {
        (document.body.style as any).zoom = '70%';
      });

      const botaoAceitar = page.getByRole('button', { name: /aceitar/i });
      const cookiesApareceu = await botaoAceitar.isVisible({ timeout: 5000 }).catch(() => false);
      if (cookiesApareceu) {
        await botaoAceitar.click({ force: true });
        await botaoAceitar.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      }
    });

    await test.step('Navega até a seção HISTÓRIA', async () => {
      const linkHistoria = page.getByRole('link', { name: 'HISTÓRIA', exact: true });

      await linkHistoria.evaluate((el) => el.removeAttribute('target'));
      await linkHistoria.click({ force: true });

      await expect(page.getByText('Nossa História').first()).toBeInViewport({ timeout: 10000 });

      urlEsperada = page.url();
    });
  });

  for (const ano of anos) {
    test(`Seleciona o ano ${ano} na linha do tempo e tira print`, async ({ page }) => {
      const seletor = `[aria-label="${ano}"]`;
      const botaoAno = page.locator(seletor).locator('visible=true').first();

      await test.step(`Verifica que o botão do ano ${ano} existe na página`, async () => {
        await expect(botaoAno, `Elemento ${seletor} deveria existir na página`).toBeVisible();
      });

      await test.step(`Clica no ano ${ano} na linha do tempo`, async () => {
        await botaoAno.scrollIntoViewIfNeeded();

        await botaoAno.evaluate((el) => (el as HTMLElement).click());
        await page.waitForTimeout(1500);
      });

      await test.step('Confere que o clique não navegou para outra página', async () => {
        const baseUrlAtual = page.url().split('#')[0];
        const baseUrlEsperada = urlEsperada.split('#')[0];
        expect(baseUrlAtual, `O clique no ano ${ano} não deveria navegar para outra página`).toBe(baseUrlEsperada);
      });

      await test.step(`Confere que o slide exibido é o do ano ${ano}`, async () => {
        await expect(page.getByText('Nossa História').first()).toBeVisible({ timeout: 10000 });

        const slideDoAno = page.getByText(new RegExp(`^${ano}\\s*-`)).first();
        await expect(slideDoAno, `O slide ativo deveria mostrar o conteúdo do ano ${ano}`).toBeInViewport({ timeout: 10000 });
      });

      await page.waitForTimeout(500);
    });
  }
});