import {createReducer} from "@reduxjs/toolkit";
import MenuActions from "src/redux/actions/MenuActions";
import {IReducerMenu} from "./index";
import MakeId from "src/utils/MakeId";

const initialState: IReducerMenu = {
    showForm: false,
    showWallet: false,
    listItems: [
        {
            id: MakeId(5),
            name: 'Arroz Branco',
            description: 'Arroz branco é o arroz que teve a sua casca, farelo e germe removido. Isso altera o sabor, a textura e a aparência do arroz e ajuda a evitar a deterioração, além de prolongar sua vida útil.',
            price: 99.99,
            leadTime: 10,
            image: 'https://www.dicasdemulher.com.br/wp-content/uploads/2017/06/arroz-simples.jpg'
        },
        {
            id: MakeId(5),
            name: 'Feijão Carioca',
            description: 'Feijão carioca é uma variedade do feijão comum. Diferentemente da crença popular, o nome não tem relação com o estado do Rio de Janeiro, mas com uma raça de porcos de semelhante coloração.',
            price: 7.5,
            leadTime: 30,
            image: 'https://conteudo.imguol.com.br/bf/2016/09/30/feijao-carioca-1475248200048_v2_900x506.jpg'
        },
        {
            id: MakeId(5),
            name: 'Carne Assada',
            description: 'Carne asada é um prato de carne grelhada e fatiada, geralmente bife de saia, bife de lombo, bife de lombo ou bife de costela.',
            price: 17,
            leadTime: 20,
            image: 'https://s2.glbimg.com/M6QJ41UTzTGPzYYbmqGs-ObPZ5c=/696x390/smart/filters:cover():strip_icc()/s.glbimg.com/po/rc/media/2012/06/13/15/30/39/348/carne_assada_na_panela_de_pressao.jpg'
        },
        {
            id: MakeId(5),
            name: 'Carne de Sol',
            description: 'Típica do nordeste brasileiro, a carne de sol é um método de conservar alimentos de origem animal salgando-se e secando-se, em local coberto e bem ventilado, peças de carne, em geral bovina.',
            price: 120,
            leadTime: 5,
            image: 'https://conteudo.imguol.com.br/c/entretenimento/42/2020/04/06/carne-de-sol-do-mocoto-1586183546706_v2_1920x1279.jpg'
        },
        {
            id: MakeId(5),
            name: 'Batata Frita',
            description: 'O termo batatas fritas refere-se ao produto da preparação culinária de batatas cortadas previamente em tiras, palitos finíssimos, rodelas ou folhas e, posteriormente, fritas.',
            price: 15,
            leadTime: 10,
            image: 'https://img.itdg.com.br/tdg/images/recipes/000/018/897/164773/164773_original.jpg?mode=crop&width=710&height=400'
        }
    ],
    listPrepare: [],
    walletValue: 0,
    bankValue:0
}

export default createReducer(initialState, builder => {
    builder.addCase(MenuActions.SHOW_FORM, (state, action) => {
        state.showForm = action.payload;
    }).addCase(MenuActions.SHOW_WALLET, (state, action) => {
        state.showWallet = action.payload;
    }).addCase(MenuActions.INSERT_ITEM, (state, action) => {
        state.listItems.push(action.payload);
    }).addCase(MenuActions.REMOVE_ITEM, (state, action) => {
        state.listItems = state.listItems.filter(value => (value.id !== action.payload));
    }).addCase(MenuActions.INSERT_SCHEDULE, (state, action) => {
        state.listPrepare.push(action.payload);
    }).addCase(MenuActions.REMOVE_SCHEDULE, (state, action) => {
        state.listPrepare = state.listPrepare.filter(value => (value.item !== action.payload));
    }).addCase(MenuActions.ADD_WALLET_VALUE, (state, action) => {
        state.walletValue += action.payload;
    }).addCase(MenuActions.SET_WALLET_VALUE, (state, action) => {
        state.walletValue = action.payload;
    }).addCase(MenuActions.ADD_BANK_VALUE,(state, action) => {
        state.bankValue += action.payload;
    });
});