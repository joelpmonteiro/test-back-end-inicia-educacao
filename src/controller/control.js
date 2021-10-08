
const { axios, post } = require('../middleware/axios.js');
module.exports = {
    pToFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        if (!isNaN(num)) {
            return parseInt(num.toString().match(re)[0]);
        }
    },
    async obtemCasosCovid(req, res) {
        try {
            const totalDeHabitantes = 100000;

            if (req.query.state != '' && req.query.dateStart != '' && req.query.dateEnd != '') {
                const { state, dateStart, dateEnd } = req.query;

                const response = await axios.get(`caso/data/?state=${state}&date=${dateStart}`);

                let casos = response.data.results.map(casos => {
                    const x = ((((casos.estimated_population * casos.confirmed_per_100k_inhabitants) / totalDeHabitantes) * 100) / casos.estimated_population * 100);
                    if (!isNaN(x)) return { percentualDeCasos: x, nomeCidade: casos.city }

                });

                casos.sort((a, b) => b.percentualDeCasos - a.percentualDeCasos)
                let maiorPorcentagem = [];
                for (let i = 0; i < 10; i++) {
                    maiorPorcentagem[i] = casos[i]
                    maiorPorcentagem[i].id = i
                    console.log(maiorPorcentagem[i])
                }

                const retornRequest = await post(maiorPorcentagem)

                if (retornRequest.status === 200 && retornRequest.statusText === 'OK') {
                    return res.status(200).json({ msg: 'Top 10 Cidades com maior Percentual de casos', maiorPorcentagem })

                } else {
                    return res.status(200).json({ msg: 'Top 10 Cidades com maior Percentual de casos', requestPost: 'Houve um erro ao enviar o pacote de dados para o host do test' })
                }

            } else {
                return res.status(404).json({ msg: 'Informe os dados corretamente para acessar a API' })
            }
            // console.log(maiorPorcentagem)

        } catch (err) {
            return res.status(404).json({ msg: 'Erro interno na api' })
        }

    }
}