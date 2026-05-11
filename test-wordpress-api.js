#!/usr/bin/env node

/**
 * WordPress API Tester
 * Script para testar se a API do WordPress está funcionando
 * Uso: node test-wordpress-api.js
 */

const https = require('https');
const http = require('http');

const WORDPRESS_URL = process.env.VITE_WORDPRESS_URL || 'https://your-wordpress-site.com';

console.log('🚀 Testando API do WordPress...\n');
console.log(`📍 URL do WordPress: ${WORDPRESS_URL}\n`);

const endpoints = [
    { path: '/wp-json/wp/v2/portfolio_projects', name: 'Portfolio Projects' },
    { path: '/wp-json/wp/v2/portfolio_services', name: 'Services' },
    { path: '/wp-json/wp/v2/portfolio_pages?slug=hero', name: 'Hero Page' },
    { path: '/wp-json/wp/v2/portfolio_pages?slug=about', name: 'About Page' },
    { path: '/wp-json/wp/v2/portfolio_pages?slug=contact', name: 'Contact Page' },
];

function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        const url = WORDPRESS_URL + endpoint.path;
        const client = WORDPRESS_URL.startsWith('https') ? https : http;

        console.log(`🔍 Testando: ${endpoint.name}`);
        console.log(`📡 URL: ${url}`);

        const req = client.get(url, { timeout: 10000 }, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);

                    if (res.statusCode === 200) {
                        const count = Array.isArray(jsonData) ? jsonData.length :
                                    (jsonData.id ? 1 : 0);

                        console.log(`✅ ${endpoint.name}: OK (${count} items)`);

                        if (count === 0) {
                            console.log(`⚠️  AVISO: Nenhum ${endpoint.name.toLowerCase()} encontrado. Crie alguns no admin do WordPress.`);
                        }
                    } else {
                        console.log(`❌ ${endpoint.name}: HTTP ${res.statusCode}`);
                    }

                    resolve({ endpoint: endpoint.name, status: 'success', count });
                } catch (e) {
                    console.log(`❌ ${endpoint.name}: Resposta inválida (não é JSON)`);
                    resolve({ endpoint: endpoint.name, status: 'error', error: 'Invalid JSON' });
                }
            });
        });

        req.on('error', (err) => {
            console.log(`❌ ${endpoint.name}: Erro de conexão - ${err.message}`);
            resolve({ endpoint: endpoint.name, status: 'error', error: err.message });
        });

        req.on('timeout', () => {
            console.log(`❌ ${endpoint.name}: Timeout (10s)`);
            req.destroy();
            resolve({ endpoint: endpoint.name, status: 'error', error: 'Timeout' });
        });
    });
}

async function runTests() {
    const results = [];

    for (const endpoint of endpoints) {
        const result = await testEndpoint(endpoint);
        results.push(result);
        console.log(''); // Linha em branco
    }

    // Resumo final
    const successCount = results.filter(r => r.status === 'success').length;
    const totalCount = results.length;

    console.log('📊 RESUMO FINAL:');
    console.log(`✅ ${successCount}/${totalCount} endpoints funcionando\n`);

    if (successCount === totalCount) {
        console.log('🎉 Parabéns! Sua API WordPress está funcionando perfeitamente!');
        console.log('🚀 Agora você pode conectar seu portfólio React.');
        console.log('\n📝 Próximos passos:');
        console.log('1. Configure o .env do React com sua URL WordPress');
        console.log('2. Execute: npm run dev');
        console.log('3. Teste se os dados aparecem no portfólio');
    } else {
        console.log('⚠️  Alguns endpoints não estão funcionando.');
        console.log('\n🔧 Possíveis soluções:');
        console.log('1. Verifique se o plugin Portfolio Manager está ativado');
        console.log('2. Certifique-se que o ACF está instalado');
        console.log('3. Vá para Configurações > Links Permanentes e salve');
        console.log('4. Teste novamente: node test-wordpress-api.js');
        console.log('\n📖 Ou consulte: WORDPRESS_SETUP_GUIA.md');
    }

    console.log('\n💡 Dica: Execute este script sempre que fizer mudanças no WordPress.');
}

runTests().catch(console.error);