"use client";

import { useEffect, useMemo, useState } from "react";

const whatsappBase = "https://api.whatsapp.com/send?phone=5569992446554";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Home() {
  const [bill, setBill] = useState<number | "">(500);
  const [consumption, setConsumption] = useState(420);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [installation, setInstallation] = useState("Residencial");
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const billValue = bill === "" ? 0 : bill;
  const estimate = useMemo(() => {
    const eligible = billValue >= 300;
    const discount = 8.5;
    const monthly = eligible ? billValue * (discount / 100) : 0;
    return { monthly, yearly: monthly * 12, discount, eligible };
  }, [billValue]);

  const whatsapp = useMemo(() => {
    const message = [
      "Olá, Ana Letícia! Gostaria de receber uma simulação de economia.",
      "",
      `Nome: ${name || "Não informado"}`,
      `Tipo de instalação: ${installation}`,
      `Contato: ${contact || "(não informado)"}`,
      `E-mail: ${email || "não informado"}`,
      `Consumo mensal: ${consumption.toLocaleString("pt-BR")} kWh`,
      `Fatura mensal: ${billValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      `Desconto indicativo exibido: ${estimate.discount.toLocaleString("pt-BR")}%`,
      `Economia mensal indicativa: ${estimate.monthly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
      "",
      "Pode analisar meu perfil, por favor?",
    ].join("\n");
    return `${whatsappBase}&text=${encodeURIComponent(message)}`;
  }, [name, installation, contact, email, consumption, billValue, estimate]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [drawerOpen]);

  const closeMenu = () => setMenuOpen(false);
  const rangeProgress = Math.min(100, Math.max(0, ((consumption - 50) / 2950) * 100));
  const updateBill = (value: string) => setBill(value === "" ? "" : Math.max(0, Number(value)));

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ana Letícia - início">
          <span className="brand-mark">G</span>
          <span className="brand-text">
            <strong>ANA LETÍCIA</strong>
            <small>CONSULTORA GRAM ENERGIA</small>
          </span>
        </a>
        <button
          className="menu-button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Menu principal">
          <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
          <a href="#usinas" onClick={closeMenu}>Nossas usinas</a>
          <a href="#economia" onClick={closeMenu}>Simule sua economia</a>
          <a className="nav-cta" href="#economia" onClick={closeMenu}>
            Simular economia <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Vista aérea de usina solar da Gram Energia" />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow light"><span /> ENERGIA VERDE PARA RONDÔNIA</p>
          <h1>Economize na conta de luz.<br /><em>Sem obras. Sem investimento.</em></h1>
          <p className="hero-copy">
            Tenha energia limpa por assinatura e atendimento próximo, do primeiro cálculo até a sua economia chegar.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#economia">
              Calcular minha economia <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link light-link" href="#como-funciona">Entenda em 1 minuto <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-side-note">ENERGIA GERADA AQUI, PARA QUEM VIVE AQUI</div>
        <div className="hero-stat">
          <strong>ATÉ 15%</strong>
          <span>de desconto estimado<br />na tarifa de energia*</span>
        </div>
      </section>

      <section className="intro section" id="como-funciona">
        <div className="section-kicker"><span>01</span><i /></div>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">ENERGIA POR ASSINATURA</p>
            <h2>Uma mudança simples.<br /><em>Um impacto real.</em></h2>
          </div>
          <div className="intro-copy">
            <p>Você continua recebendo energia normalmente pela distribuidora. A diferença é que parte do seu consumo passa a ser compensada por créditos de energia limpa produzida pelas usinas da GRAM.</p>
            <a className="text-link" href="#economia">Ver se minha conta se enquadra <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="steps">
          <article>
            <div className="step-top"><span>01</span><b>CONTA</b></div>
            <div className="step-icon">▤</div>
            <h3>Envie sua fatura</h3>
            <p>A Ana analisa seu histórico e prepara uma simulação personalizada, sem compromisso.</p>
          </article>
          <article>
            <div className="step-top"><span>02</span><b>ADESÃO</b></div>
            <div className="step-icon">✓</div>
            <h3>Assine digitalmente</h3>
            <p>Sem instalação de placas, sem obra e sem investimento inicial. O processo é online.</p>
          </article>
          <article>
            <div className="step-top"><span>03</span><b>ECONOMIA</b></div>
            <div className="step-icon">↓</div>
            <h3>Comece a economizar</h3>
            <p>Os créditos são aplicados pela distribuidora e a economia aparece nas próximas faturas.</p>
          </article>
        </div>
      </section>

      <section className="plants section" id="usinas">
        <div className="section-kicker inverse"><span>02</span><i /></div>
        <div className="plants-heading">
          <div>
            <p className="eyebrow light">GERAÇÃO PRÓPRIA E SUSTENTÁVEL</p>
            <h2>Da força do sol e da água,<br /><em>nasce a sua economia.</em></h2>
          </div>
          <p>Ativos de geração renovável em Rondônia, conectando desenvolvimento local, tecnologia e um futuro de baixo carbono.</p>
        </div>
        <div className="plant-gallery">
          <article className="plant-card large cujubim">
            <div className="plant-label"><span>UFV 01</span><h3>Usina Solar Cujubim</h3><p>Cujubim · Rondônia</p></div>
            <span className="plant-type">SOLAR</span>
          </article>
          <article className="plant-card machadinho">
            <div className="plant-label"><span>UFV 02</span><h3>Usina Solar Machadinho</h3><p>Machadinho d'Oeste · RO</p></div>
            <span className="plant-type">SOLAR</span>
          </article>
          <article className="plant-card cgh">
            <div className="plant-label"><span>CGH 03</span><h3>CGH Campo Novo</h3><p>Campo Novo de Rondônia · RO</p></div>
            <span className="plant-type">HÍDRICA</span>
          </article>
        </div>
        <div className="impact-strip">
          <p><span>✦</span> Energia produzida em Rondônia</p>
          <p><span>✦</span> Geração 100% renovável</p>
          <p><span>✦</span> Monitoramento especializado</p>
        </div>
      </section>

      <section className="calculator section" id="economia">
        <div className="section-kicker"><span>03</span><i /></div>
        <div className="calculator-grid">
          <div className="calculator-copy">
            <p className="eyebrow">SIMULAÇÃO RÁPIDA</p>
            <h2>Quanto você pode<br /><em>deixar de gastar?</em></h2>
            <p>Informe seu consumo em kWh e o valor médio da conta. Em poucos segundos você recebe uma estimativa e pode enviar os dados diretamente para a Ana.</p>
            <div className="trust-note"><span>✓</span><p><strong>Simulação gratuita</strong><br />Sem compromisso e sem burocracia.</p></div>
          </div>
          <div className="calculator-card">
            <div className="discount-badge">
              <span>DESCONTO PADRÃO</span>
              <strong>8,5%</strong>
              <small>para faturas a partir de R$ 300</small>
            </div>
            <label htmlFor="consumption">Consumo médio mensal</label>
            <div className="consumption-input"><input id="consumption" type="number" min="50" max="10000" step="10" value={consumption} onChange={(e) => setConsumption(Math.max(0, Number(e.target.value)))} /><span>kWh</span></div>
            <input className="range discount-range" style={{ background: `linear-gradient(90deg, var(--green) 0 ${rangeProgress}%, #d7dfda ${rangeProgress}% 100%)` }} aria-label="Consumo mensal em kWh" type="range" min="50" max="3000" step="10" value={Math.min(consumption, 3000)} onChange={(e) => setConsumption(Number(e.target.value))} />
            <label htmlFor="bill">Valor médio da sua conta</label>
            <div className="money-input"><span>R$</span><input id="bill" type="number" min="100" max="50000" step="50" value={bill} onChange={(e) => updateBill(e.target.value)} onBlur={() => bill === "" && setBill(0)} /></div>
            {!estimate.eligible && <div className="eligibility-note"><span>VALOR MÍNIMO</span><p>O desconto está disponível para faturas a partir de R$ 300.</p></div>}
            <div className="estimate">
              <div><span>Economia estimada por mês</span><strong>{estimate.monthly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></div>
              <div><span>Em 12 meses</span><strong>{estimate.yearly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></div>
            </div>
            <button className="button whatsapp-button wide" type="button" onClick={() => setDrawerOpen(true)}><span>Solicitar simulação pelo WhatsApp</span> <ArrowIcon /></button>
            <small>*Simulação indicativa com percentual padrão de 8,5% para faturas a partir de R$ 300, sem garantia de resultado. A economia efetiva depende da unidade consumidora, modalidade tarifária, tributos, bandeiras, disponibilidade de créditos e condições da proposta comercial.</small>
          </div>
        </div>
      </section>

      <section className="about section">
        <div className="about-photo">
          <img src="/images/ana-leticia.jpeg" alt="Ana Letícia, consultora da GRAM Energia" />
          <span>ANA LETÍCIA<br />CONSULTORA GRAM ENERGIA</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ATENDIMENTO HUMANO</p>
          <h2>Do cálculo à economia,<br /><em>Ana está com você.</em></h2>
          <p>Mais do que apresentar uma proposta, a Ana Letícia acompanha cada etapa com clareza: analisa sua conta, explica as condições e ajuda você a tomar uma decisão segura.</p>
          <div className="about-points">
            <p><span>01</span> Explicação simples e transparente</p>
            <p><span>02</span> Atendimento para residências e empresas</p>
            <p><span>03</span> Suporte durante toda a adesão</p>
          </div>
          <a className="button dark about-simulation-button" href="#economia">Fazer uma simulação <span aria-hidden="true">↑</span></a>
        </div>
      </section>

      <section className="closing">
        <div className="closing-bg" />
        <div className="closing-content">
          <p className="eyebrow light">O PRÓXIMO PASSO É SIMPLES</p>
          <h2>Sua conta pode ser mais leve.<br /><em>E o futuro também.</em></h2>
          <a className="button white" href="#economia">Simular minha economia <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand-block">
          <a className="footer-brand" href="#inicio"><span>G</span><div><strong>ANA LETÍCIA</strong><small>CONSULTORA GRAM ENERGIA</small></div></a>
          <p>Energia renovável, economia e atendimento próximo para residências e empresas de Rondônia.</p>
        </div>
        <nav className="footer-links" aria-label="Navegação do rodapé"><small>NAVEGAÇÃO</small><a href="#como-funciona">Como funciona <span>→</span></a><a href="#usinas">Nossas usinas <span>→</span></a><a href="#economia">Simule sua economia <span>→</span></a></nav>
        <div className="footer-contact"><small>ATENDIMENTO</small><a href="#economia">Solicitar uma simulação <span>↓</span></a><a href="https://www.gramenergia.com/" target="_blank" rel="noreferrer">Visitar a GRAM Energia <span>↗</span></a></div>
        <div className="footer-bottom"><span>© 2026 Ana Letícia · Consultora GRAM Energia</span><span>Energia acessível e sustentável para todos.</span></div>
      </footer>

      <div className={drawerOpen ? "drawer-shell open" : "drawer-shell"} aria-hidden={!drawerOpen}>
        <button className="drawer-backdrop" type="button" aria-label="Fechar formulário" onClick={() => setDrawerOpen(false)} />
        <aside className="simulation-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <div className="drawer-header">
            <div><span>ATENDIMENTO PERSONALIZADO</span><h2 id="drawer-title">Solicite sua simulação</h2></div>
            <button className="drawer-close" type="button" aria-label="Fechar" onClick={() => setDrawerOpen(false)}>×</button>
          </div>
          <p className="drawer-intro">Preencha os dados abaixo. Ao continuar, o WhatsApp abrirá uma mensagem organizada para a Ana Letícia.</p>
          <div className="drawer-summary">
            <div><span>Consumo informado</span><strong>{consumption.toLocaleString("pt-BR")} kWh/mês</strong></div>
            <div><span>Valor da fatura</span><strong>{billValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></div>
            <div><span>Economia estimada</span><strong>{estimate.monthly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}/mês</strong></div>
          </div>
          <div className="drawer-form">
            <label htmlFor="drawer-name">Nome</label>
            <input id="drawer-name" type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="drawer-installation">Tipo de instalação</label>
            <select id="drawer-installation" value={installation} onChange={(e) => setInstallation(e.target.value)}><option>Residencial</option><option>Comercial</option></select>
            <label htmlFor="drawer-contact">Contato</label>
            <input id="drawer-contact" type="tel" inputMode="tel" maxLength={15} placeholder="(99) 99999-9999" value={contact} onChange={(e) => setContact(formatPhone(e.target.value))} />
            <label htmlFor="drawer-email">E-mail</label>
            <input id="drawer-email" type="email" inputMode="email" autoComplete="email" placeholder="contato@gmail.com" value={email} onChange={(e) => setEmail(e.target.value.trimStart())} />
            <div className="drawer-row">
              <div><label htmlFor="drawer-consumption">Consumo mensal</label><div className="unit-field"><input id="drawer-consumption" type="number" min="0" value={consumption} onChange={(e) => setConsumption(Math.max(0, Number(e.target.value)))} /><span>kWh</span></div></div>
              <div><label htmlFor="drawer-bill">Fatura mensal</label><div className="unit-field"><span>R$</span><input id="drawer-bill" type="number" min="0" value={bill} onChange={(e) => updateBill(e.target.value)} onBlur={() => bill === "" && setBill(0)} /></div></div>
            </div>
          </div>
          <a className="button drawer-submit wide" href={whatsapp} target="_blank" rel="noreferrer"><span>Continuar no WhatsApp</span><ArrowIcon /></a>
          <small className="privacy-note">Seus dados não ficam armazenados neste site. Eles serão enviados somente quando você continuar para o WhatsApp.</small>
        </aside>
      </div>
    </main>
  );
}
