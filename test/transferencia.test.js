const request = require('supertest');
const { expect } = require('chai');
const {obterToken} = require('../helpers/autenticacao')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token
        
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10 sem token', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send({
					'contaOrigem': 1,
					'contaDestino': 2,
                    'valor': 10,
                    'token': ''
				})
            expect(resposta.status).to.equal(201);
            console.log(resposta.status)
        })
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10, com token', async () => {
             const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send({
					'contaOrigem': 1,
					'contaDestino': 2,
                    'valor': 10,
                    'token': '123456'
				})
            expect(resposta.status).to.equal(201);
            console.log(resposta.status)
        })
        it('Deve retornar falha com 422 quando conta origem for inexistente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send({
					'contaOrigem': 8,
					'contaDestino': 2,
                    'valor': 9.99,
                    'token': ''
				})
            expect(resposta.status).to.equal(422);
            console.log(resposta.status)
        })
    })
})