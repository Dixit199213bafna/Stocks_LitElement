import { LitElement, html, css } from 'lit-element';
import {Router} from '@vaadin/router';
// import { Request } from 'axios-request-handler';

import InstrumentStore from "../helpers/instrumentStore.js";
import {tableCss} from "../css/table.js";

const reviews = new Request('api/securities/mobile/markets/stockmarkets/AEX');

class Investments extends LitElement {
    static get properties() {
        return {
            instruments: Array,
        };
    }

    static get styles() {
        return css`
        ${tableCss}
        .container {
            height: 800px;
            overflow: auto;
        }
        .increaseInPrice {
          --c: green;
          animation: BLINK 1s infinite ;
        }
        .decreaseInPrice {
            --c: #e50000;
            animation: BLINK 1s infinite ;
         }
         @keyframes BLINK {
         100% {
            background-color: var(--c);
         }
    `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.pollInterval = setInterval(() => {
          fetch('api/securities/mobile/markets/stockmarkets/AEX').then(response => response.json())
            .then(response => {
              this.instruments = this.instruments ?
                      this.appendVariableToHighLight(response.instruments) : [...response.instruments]
            });
        }, 2000);
    }

    appendVariableToHighLight(stocks) {
        const map = new Map();
        this.instruments.forEach(item => map.set(item.uid, item));
        stocks.forEach(item => map.set(item.uid, {
            ...map.get(item.uid),
            ...item,
            increaseInPrice: item.currentPrice.value > map.get(item.uid).currentPrice.value,
            decreaseInPrice: item.currentPrice.value < map.get(item.uid).currentPrice.value
        }));
        return Array.from(map.values());
    }

    redirectToInstrumentDetail(investment) {
        InstrumentStore.setInstrument(investment)
        Router.go(`/stock`);
    }

    render() {
        return this.instruments ? html`
            <div class="container">
                <table class="table">
                    <thead>
                        <th>Name</th>
                        <th>Price</th>
                     </thead>
                     <tbody>
                     ${this.instruments.map(investment => html `
                        <tr class="${investment.decreaseInPrice ? 'decreaseInPrice' : ''} ${investment.increaseInPrice ? 'increaseInPrice' : ''}">
                            <td @click="${() => this.redirectToInstrumentDetail(investment)}">${investment.name}</td>
                            <td>${investment.currentPrice.value}</td>
                        </tr>
                     `)}
                     </tbody>
                </table>
            </div>` : html `<p>Loading...</p>`
    }

    disconnectedCallback() {
        super.disconnectedCallback();
      clearInterval(this.pollInterval);
    }
}

customElements.define('app-investments', Investments);
