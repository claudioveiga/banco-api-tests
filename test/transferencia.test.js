const request = require('supertest');
const { expect } = require('chai');
const {obterToken} = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token
        
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10 sem token', async () => {
            const bodyTransferencias = { ...postTransferencias }

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send(bodyTransferencias)

            expect(resposta.status).to.equal(201);
            console.log(resposta.status)
        })
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10, com token', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7 
            
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send(bodyTransferencias)

            expect(resposta.status).to.equal(201);
            console.log(resposta.status)
        })
        it('Deve retornar falha com 422 quando conta origem for inexistente', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.contaOrigem = 8
            bodyTransferencias.valor = 9.99
            
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send(bodyTransferencias)

            expect(resposta.status).to.equal(422);
            console.log(resposta.status)
        })
    })
})