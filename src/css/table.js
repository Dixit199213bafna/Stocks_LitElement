import { css } from 'lit-element';

export const tableCss = css `
    table {
          border-collapse: collapse;
          width: 100%;
        }
        
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        
         tr:hover {background-color:#f5f5f5;} 
`
