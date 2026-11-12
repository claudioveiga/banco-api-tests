const request = require('supertest');
const { expect } = require('chai');
const {obterToken} = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    let token
        
    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    })
    describe('POST /transferencias', () => {
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
            bodyTransferencias.valor = 10 
            
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
				.send(bodyTransferencias)

            expect(resposta.status).to.equal(201);
            console.log(resposta.status)
        })
        /*it('Deve retornar falha com 422 quando conta origem for inexistente', async () => {
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
        })*/
    })
    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de daods quando o id for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/10')
                .set('Authorization', 'Bearer ' + token) // o 'Bearer ' + token' pode ser escrto como `Bearer ${token}`
        
            console.log(resposta.status)
            console.log(resposta.body)
            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal(10)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.valor).to.equal(10.00)
            expect(resposta.body.valor).to.be.a('number')
        })
    })
    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginacao quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}` )

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)
            console.log(resposta.body)
        })
    })
})