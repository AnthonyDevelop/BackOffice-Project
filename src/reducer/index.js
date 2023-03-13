import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import reducerPosts from "./reducerPosts";
import reducerCategorias from "./reducerCategorias";
import reducerPostsFiltradas from "./reducerPostsFiltradas";
import reducerLogin from "./reducerLogin";
import reducerDataUser from "./reducerDataUser";
import reducerListPost from "./reducerListPost";
import reducerListPostUser from "./reducerListPostUser";
import reducerRespuestaCategoria from "./reducerRespuestaCategoria";
import reducerRespuestaSubirArchivo from "./respuestaSubirArchivos";
import reducerListMultimedia from "./reducerListMultimedia";
import reducerListaUser from "./reducerListaUser";
import reducerRespuestaCreatePost from "./reducerCreatePost";
import reducerEditarPost from "./reducerEditarPost";
import reducerRespuestaEditUser from "./reducerRespuestaEditarUser";
import reducerDataPost from "./reducerDataPost";
import reducerRespuestaEliminarPost from "./reducerRespuestaEliminarPost";
import reducerRoleUser from "./reducerRoleUser";
import reducerDataPostPath from "./reducerDataPostPath";
import reducerCargarPublicidad from "./reducerCargarPublicidad";
import reducerListPublicidades from "./reducerListPublicidades";
import reducerListPostOeste from "./reducerListPostOeste";
import reducerRespuestaDataUser from "./reducerRespuestaDataUser";
import reducerRespuestaLogin from "./reducerRespuestaLogin";
import reducerListCategoriaSinSub from "./reducerListCategoriaSinSub";
import reducerResputaListPostGeneral from "./reducerResputaListPostGeneral";
import reducerModoOscuro from "./reducerModoOscuro";
import reducerEliminarMultimedia from "./reducerEliminarMultimedia";

const rootReducer = combineReducers({
    routing: routerReducer,
    reducerPosts: reducerPosts,
    reducerPostsFiltradas: reducerPostsFiltradas,
    reducerCategorias: reducerCategorias,
    reducerLogin: reducerLogin,
    reducerDataUser: reducerDataUser,
    reducerListPost: reducerListPost,
    reducerListPostUser: reducerListPostUser,
    reducerRespuestaCategoria: reducerRespuestaCategoria,
    reducerRespuestaSubirArchivo: reducerRespuestaSubirArchivo,
    reducerListMultimedia: reducerListMultimedia,
    reducerListaUser: reducerListaUser,
    reducerRespuestaCreatePost: reducerRespuestaCreatePost,
    reducerRespuestaEditUser: reducerRespuestaEditUser,
    reducerEditarPost: reducerEditarPost,
    reducerDataPost: reducerDataPost,
    reducerRespuestaEliminarPost: reducerRespuestaEliminarPost,
    reducerRoleUser: reducerRoleUser,
    reducerDataPostPath: reducerDataPostPath,
    reducerCargarPublicidad: reducerCargarPublicidad,
    reducerListPublicidades: reducerListPublicidades,
    reducerListPostOeste: reducerListPostOeste,
    reducerRespuestaDataUser: reducerRespuestaDataUser,
    reducerRespuestaLogin: reducerRespuestaLogin,
    reducerListCategoriaSinSub:reducerListCategoriaSinSub,
    reducerResputaListPostGeneral: reducerResputaListPostGeneral,
    reducerModoOscuro:reducerModoOscuro,
    reducerEliminarMultimedia:reducerEliminarMultimedia,
})

export default rootReducer;