const sinon = require('sinon');
const { expect } = require('chai');

const AnswerService = require('../../app/services/Answer');
const AnswerController = require('../../app/controllers/Answer');
const error = require('../../app/middlewares/error');

describe('Teste camada controller de Answer', () => {
  describe('Listar todas as respostas', () => {
    const response = {};
    const request = {};
    const next = (err) => error(err, request, response, next);

    const payloadAnswer =  {
      peopleQuantity: "1 até 3",
      satisfaction: 10,
   }

   const payloadAnswer2 =  {
    peopleQuantity: "4 até 6",
    satisfaction: 9,
 }

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(AnswerService, 'getAll').resolves([payloadAnswer, payloadAnswer2]);
    });

    afterEach(() => {
      AnswerService.getAll.restore();
    });

    describe('Quando a busca é realizada com sucesso', () => {
      it('É chamado status com o código 200', async () => {
        await AnswerController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a resposta criada', async () => {
        await AnswerController.getAll(request, response, next);

        expect(response.json.calledWith([payloadAnswer, payloadAnswer2])).to.be.true;
      });
    })
  })

  describe('Insersão de uma resposta no banco de dados', () => {
    describe('Quando ocorre algum erro tratado', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 400, message: 'Message' };
  
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(AnswerService, 'create').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        AnswerService.create.restore();
      });

      it('É chamado status com o código 400', async () => {
        await AnswerController.create(request, response, next);

        expect(response.status.calledWith(ERROR_OBJ.code)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await AnswerController.create(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando ocorre algum erro interno', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { message: 'Message' };
  
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(AnswerService, 'create').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        AnswerService.create.restore();
      });

      it('É chamado status com o código 500', async () => {
        await AnswerController.create(request, response, next);

        expect(response.status.calledWith(500)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await AnswerController.create(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando cria a resposta com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);

      const payloadAnswer =  {
        peopleQuantity: "1 até 3",
        satisfaction: 10,
     }
  
      beforeEach(() => {
        response.body = payloadAnswer;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(AnswerService, 'create').resolves({ answer: payloadAnswer });
      });
  
      afterEach(() => {
        AnswerService.create.restore();
      });


      it('É chamado status com o código 201', async () => {
        await AnswerController.create(request, response, next);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('É chamado json com a resposta criada', async () => {
        await AnswerController.create(request, response, next);

        expect(response.json.calledWith(payloadAnswer)).to.be.true;
      });
    })

  })
});