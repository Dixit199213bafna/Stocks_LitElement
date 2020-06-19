import { LitElement, html, css } from 'lit-element';
import './view/investments.js';
import './view/stock-item.js';
import { Router } from '@vaadin/router';

export class AssesmentDixit extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const router = new Router(this.shadowRoot.querySelector('main'));
    router.setRoutes([
      {
        path: '/',
        component: 'app-investments'
      },
      {
        path: '/stock',
        component: 'stock-item',
      },
    ]);
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>Stocks</h1>
      </header>
    <main></main>
    `;
  }
}
