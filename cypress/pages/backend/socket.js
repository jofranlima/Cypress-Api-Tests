  import { routes } from "../../configs/routes.js";
  const sessionToken = localStorage.getItem('sessionToken');

class SocketAssertions {
  constructor() {
    this.socketConnected = false;
    this.socket = new WebSocket(`${routes.env.dev_wss}${sessionToken}`);
    this.socket.onopen = () => {
      console.log('WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensagem recebida:', message);
      this.handleMessageApproved(message);
      this.handleMessageRepproved(message) 
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket fechado:', event.code, event.reason);
    };
  }

  handleMessageApproved(message) {
    if (message && message.eventName === 'operation-finished') {
      const { data } = message;
      const { operationRequestId, status } = data;

      cy.get('@storedOperationRequestId').then((storedOperationRequestId) => {
        expect(operationRequestId).to.eq(storedOperationRequestId);
      });
      expect(status).to.eq('approved');
      
    }
  }
  handleMessageRepproved(message) {
    if (message && message.eventName === 'operation-finished') {
      const { data } = message;
      const { operationRequestId, status } = data;

      cy.get('@storedOperationRequestId').then((storedOperationRequestId) => {
        expect(operationRequestId).to.eq(storedOperationRequestId);
      });
      expect(status).to.eq('repproved');
      
    }
  }
}

export default new SocketAssertions();
