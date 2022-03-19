const sinon = require('sinon');
const { expect } = require('chai');

const QuestionService = require('../../app/services/Question');
const QuestionController = require('../../app/controllers/Question');
const error = require('../../app/middlewares/error');

describe('Teste camada controller de Question', () => {
  describe('Listar todas as questões', () => {
    const response = {};
    const request = {};
    const next = (err) => error(err, request, response, next);

    const payloadQuestion = {
      title: 'Quantas pessoas tem sua equipe?',
      answer: '1 até 3',
    }

    const payloadQuestion2 = {
      title: 'Qual a sua satisfação com a empresa?',
      answer: '10'
    }

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(QuestionService, 'getAll').resolves([payloadQuestion, payloadQuestion2]);
    });

    afterEach(() => {
      QuestionService.getAll.restore();
    });

    describe('Quando a busca é realizada com sucesso', () => {
      it('É chamado status com o código 200', async () => {
        await QuestionController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a questão criada', async () => {
        await QuestionController.getAll(request, response, next);

        expect(response.json.calledWith([payloadQuestion, payloadQuestion2])).to.be.true;
      });
    })
  })

  describe('Insersão de uma questão no banco de dados', () => {
    describe('Quando ocorre algum erro tratado', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 400, message: 'Message' };
  
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(QuestionService, 'create').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        QuestionService.create.restore();
      });

      it('É chamado status com o código 400', async () => {
        await QuestionController.create(request, response, next);

        expect(response.status.calledWith(ERROR_OBJ.code)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await QuestionController.create(request, response, next);

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
  
        sinon.stub(QuestionService, 'create').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        QuestionService.create.restore();
      });

      it('É chamado status com o código 500', async () => {
        await QuestionController.create(request, response, next);

        expect(response.status.calledWith(500)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await QuestionController.create(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando cria a questão com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const payloadQuestion = {
        title: 'Quantas pessoas tem sua equipe?',
        answer: '1 até 3',
      }
  
      beforeEach(() => {
        response.body = payloadQuestion;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(QuestionService, 'create').resolves({ question: payloadQuestion });
      });
  
      afterEach(() => {
        QuestionService.create.restore();
      });


      it('É chamado status com o código 201', async () => {
        await QuestionController.create(request, response, next);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('É chamado json com a question criada', async () => {
        await QuestionController.create(request, response, next);

        expect(response.json.calledWith(payloadQuestion)).to.be.true;
      });
    })

  })
});