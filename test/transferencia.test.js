const request = require('supertest');
const { expect } = require('chai');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$ 10 sem token', async () => {
            //Capturar o token

            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
            //Capturar o token

            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })
            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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