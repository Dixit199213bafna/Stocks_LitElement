import {LitElement, html, css} from 'lit-element';
import {Router} from '@vaadin/router';

import InstrumentStore from "../helpers/instrumentStore.js";
import { tableCss } from "../css/table.js";

class StockItem extends LitElement {
    static get properties() {
        return {
            instrument: Object,
        };
    }

    static get styles() {
        return css`
        ${tableCss}
        .grid-container {
          display: grid;
          grid-template-columns: auto auto auto auto auto auto auto auto;
          grid-gap: 10px;
          padding: 10px;
        }

        `
    }

    connectedCallback() {
        super.connectedCallback();
        if(!InstrumentStore.getInstrument()) {
            Router.go('/');
        } else {
            this.instrument = InstrumentStore.getInstrument();
        }
    }

    render() {
        return this.instrument ? html`
            <section>
                <div class="grid-container">
                  <div>
                    <strong>Name: </strong><span>${this.instrument.name}</span>
                  </div>
                  <div>
                    <strong>ISIN: </strong><span>${this.instrument.isin}</span>
                  </div>
                   <div>
                    <strong>Price: </strong><span>${this.instrument.currentPrice.value}</span>
                  </div>
                  <div>
                    <strong>Category: </strong><span>${this.instrument.category}</span>
                  </div>
                  <div>
                    <strong>Currency: </strong><span>${this.instrument.currency}</span>
                  </div>
                  <div>
                    <strong>Date: </strong><span>${new Date(this.instrument.datetime).toDateString()}</span>
                  </div>
                  <div>
                    <strong>Exchange: </strong><span>${this.instrument.exchange}</span>
                  </div>
                  <div>
                    <strong>Type: </strong><span>${this.instrument.instrumentType}</span>
                  </div>
                </div>
                <div class="grid-container">
                    <table>
                        <tbody>
                           ${Object.keys(this.instrument.priceDetails).map(priceDetail => html `
                            <tr>
                                <td>${priceDetail}</td>
                                <td>${this.instrument.priceDetails[priceDetail].value}</td>
                            </tr>
                           `)}
                        </tbody>
                    </table>
                </div>
            </section>` : html ``;
    }
}

customElements.define('stock-item', StockItem);
