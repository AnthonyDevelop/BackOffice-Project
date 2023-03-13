import {all} from 'redux-saga/effects'
import { watchRecibirPosts } from './watchRecibirPosts'
import { watchCategorias, watchCrearCategorias, watchEliminarCategoria } from './watchCategorias'
import { watchRecibirPostsFiltrados } from './watchRecibirPostsFiltradas'
import { watchLogin } from './watchLogin'
import { watchDataUser } from './watchDataUser'
import { watchListPostGeneral } from './watchListPost'
import { watchListPostUser } from './watchListPostUser'
import { watchSubirArchivos } from './watchSubirArchivos'
import { watchListMultimedia } from './watchListMultimedia'
import { watchCrearUsuario } from './watchCrearUsuario'
import { watchEditarUser } from './watchDataEditUser'
import { watchListUser } from './watchListaUser'
import { watchCreatePost } from './watchCreatePost'
import { watchEditarPost } from './watchEditarPost'
import { watchDataPost } from './watchDataPost'
import { watchEliminarPost } from './watchEliminarPost'
import { watchRoleUser } from './watchRoleUser'
import { watchDataPostPath } from './watchDataPostPath'
import { watchCargarPublicidad } from './watchCargarPublicidad'
import { watchListPublicidades } from './watchListPublicidades'
import { watchSumarVisita } from './watchSumarVisita'
import { watchRecibirPostsOeste } from './watchListPostOeste'
import { watchListCategoriasSinSub } from './watchListCategoriasSinSub'
import { watchEliminarMultimedia } from './watchEliminarMultimedia'

export default function * rootSaga(){
    yield all([
        watchRecibirPosts(),
        watchCategorias(), watchCrearCategorias(), watchEliminarCategoria(),
        watchRecibirPostsFiltrados(),
        watchLogin(),
        watchCrearUsuario(),
        watchDataUser(), watchEditarUser(), watchRoleUser(),
        watchListPostGeneral(),
        watchListPostUser(),
        watchListUser(), watchEliminarPost(),
        watchCreatePost(),
        watchSubirArchivos(),
        watchListMultimedia(),
        watchEditarPost(),
        watchDataPost(),
        watchEliminarPost(),
        watchDataPostPath(),
        watchCargarPublicidad(),
        watchListPublicidades(),
        watchSumarVisita(),
        watchRecibirPostsOeste(),
        watchListCategoriasSinSub(),
        watchEliminarMultimedia()
    ])
}