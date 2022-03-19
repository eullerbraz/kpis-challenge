const sinon = require('sinon');
const { expect } = require('chai');

const AnswerModel = require('../../app/models/Answer');
const AnswerService = require('../../app/services/Answer');
const quantityStrings = require('../../app/data/quantityStrings');

describe('Teste camada service de Answer', () => {
  describe('Listar todas as respostas', () => {
    const payloadAnswer =  {
      peopleQuantity: "1 até 3",
      satisfaction: 10,
   }

    const payloadAnswer2 = {
      peopleQuantity: "4 até 6",
      satisfaction: 9,
   }

    beforeEach(() => {
      sinon.stub(AnswerModel, 'getAll').resolves([payloadAnswer, payloadAnswer2]);
      
    });

    afterEach(() => {
      AnswerModel.getAll.restore();
    });

    describe('Quando a busca é realizada com sucesso', () => {
      it('Retorna um array', async () => {
        const response = await AnswerService.getAll();

        expect(response).to.be.an('array');
      })

      it('O array possui as respostas que estão no banco de dados', async () => {
        const response = await AnswerService.getAll();

        expect(response[1].satisfaction).to.be
          .equal(payloadAnswer2.satisfaction);
      })
    })
  })

  describe('Insersão de uma answer no banco de dados', () => {
    const payloadAnswer =  {
      peopleQuantity: "1 até 3",
      satisfaction: 10,
   }

    beforeEach(() => {
      sinon.stub(AnswerModel, 'create').resolves(payloadAnswer);
    });

    afterEach(() => {
      AnswerModel.create.restore();
    });

    describe('Quando a peopleQuantity informada é inválida', () => {
      const invalidAnswer =  {
        peopleQuantity: "10 até 30",
        satisfaction: 10,
     }
      it('Retorna um objeto', async () => {
        const response = await AnswerService.create(invalidAnswer);

        expect(response).to.be.a('object');
      })

      it(`A chave message do objeto possui a mensagem "peopleQuantity" must be one of [${quantityStrings.join(', ')}]`, async () => {
        const response = await AnswerService.create(invalidAnswer);

        expect(response.message).to.be
          .equal(`"peopleQuantity" must be one of [${quantityStrings.join(', ')}]`);
      })
    })

    describe('Quando a satisfaction informada é inválida', () => {
      const invalidAnswer =  {
        peopleQuantity: "1 até 3",
        satisfaction: 11,
     }

      it('Retorna um objeto', async () => {
        const response = await AnswerService.create(invalidAnswer);

        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem "satisfaction" must be less than or equal to 10', async () => {
        const response = await AnswerService.create(invalidAnswer);

        expect(response.message).to.be
          .equal('"satisfaction" must be less than or equal to 10');
      })
    })

    describe('Quando o payload é válido', () => {
      it('Retorna um objeto', async () => {
        const response = await AnswerService.create(payloadAnswer);
        expect(response).to.be.a('object');
      })

      it('O objeto possui uma chave answer com um objeto com as chaves peopleQuantity e satisfaction', async () => {
        const response = await AnswerService.create(payloadAnswer);

        expect(response).to.have.a.key('answer');
        expect(response.answer).to.have.a
          .key('peopleQuantity', 'satisfaction');
      })
    })
  })
});