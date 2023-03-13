import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useForm, Controller } from "react-hook-form";
import { InputGroup } from 'rsuite';
import { Button, ButtonToolbar, SelectPicker, ButtonGroup, Modal, IconButton, Toggle } from 'rsuite';
import { setCrearUsuario } from '../../../../../../../actions/crearUsuario';

import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useSpring, animated } from "react-spring";

import './crearUsuario.css';

export default function CrearUsuario() {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const handleVisible = () => { setVisible(!visible); };
    const [nextStepModal, setNextStepModal] = useState(false);
    const [openPublicando, setOpenPublicando] = useState(false);
    const handleClose = () => { setOpenPublicando(false); }

    //LISTA CATEGORIAS
    const listaRoleUser = useSelector((state) => state.reducerRoleUser.data);
    if (listaRoleUser != null && listaRoleUser.data != "") {
        var mapListaRoleUser = [];
        const lc = listaRoleUser.data;
        for (var i = 0; i < lc.length; i++) {
            mapListaRoleUser.push({
                value: lc[i].id,
                label: lc[i].nombre,
            });
        }
    }

    const fadeOut = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 450,
    });

    const [roleUser, setRoleUser] = useState("");
    const handleChangeRole = (e) => {
        setRoleUser(e);
    }

    // ENVIAR FORMULARIO //
    const locale = {
        noResultsText: "No existen resultados",
        placeholder: "",
        searchPlaceholder: "Buscar...",
        checkAll: "",
    };
    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit,
        reset,
        control,
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data) => {
        const dataPerfil = {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            contraseña: data.contraseña,
            id_rol: roleUser,
        }
        dispatch(setCrearUsuario(dataPerfil));
        setOpenPublicando(true);
    };

    const respuestaCrearUser = useSelector((state) => state.reducerRespuestaEditUser.data);
    useEffect(() => {
        if (respuestaCrearUser != null) {
            if (respuestaCrearUser.message === "Registered Succesfull") {
                setNextStepModal(true);
                setRoleUser("");
                reset();
                handleChangeRole(" ")
            }
        }
    }, [respuestaCrearUser])

    return (
        <>
            <animated.div style={fadeOut}>
                <div className='container-entradas'>
                    <div className='container-tittle'>
                        <h2>Nuevo Usuario</h2>
                    </div>
                    <div className="container-usuario">
                        <form className='child-form-container-usuario' onSubmit={handleSubmit(onSubmit)} >
                            <div className="container-input-usuario">
                                <p>Crea un nuevo usuario para el sitio</p>
                            </div>
                            <div className="container-input-usuario">
                                <p> Correo electrónico </p>
                                <div className="container-error">
                                    <input
                                        type="text"
                                        className="input-style-grey"
                                        {...register("email",
                                            { required: true }
                                        )}
                                    />
                                    {errors.email && (<p className="error">Campo Requerido</p>)}
                                </div>
                            </div>
                            <div className="container-input-usuario">
                                <p> Nombre </p>
                                <div className="container-error">
                                    <input
                                        type="text"
                                        className="input-style-grey"
                                        {...register("nombre",
                                            { required: true }
                                        )}
                                    />
                                    {errors.nombre && (<p className="error">Campo Requerido</p>)}
                                </div>
                            </div>
                            <div className="container-input-usuario">
                                <p> Apellido </p>
                                <div className="container-error">
                                    <input
                                        type="text"
                                        className="input-style-grey"
                                        {...register("apellido",
                                            { required: true }
                                        )}
                                    />
                                    {errors.apellido && (<p className="error">Campo Requerido</p>)}
                                </div>
                            </div>
                            <div className="container-input-usuario">
                                <p> Contraseña </p>
                                <div className="container-error">
                                    <InputGroup style={{ outline: 'none', border: '0' }} >
                                        <input
                                            className="input-style-grey"
                                            type={visible ? 'text' : 'password'}
                                            placeholder="Contraseña"
                                            autoComplete="new-password"
                                            {...register("contraseña",
                                                { required: true }
                                            )}
                                        />
                                        <InputGroup.Button onClick={handleVisible} >
                                            {visible ? <EyeIcon /> : <EyeSlashIcon />}
                                        </InputGroup.Button>
                                    </InputGroup>
                                    {errors.contraseña && (<p className="error">Campo Requerido</p>)}
                                </div>
                            </div>
                            <div className="container-input-usuario">
                                <p> Perfil </p>
                                <div className="container-error">
                                    <Controller
                                        name="id_rol"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { ref, ...field } }) => (
                                            <SelectPicker
                                                {...field}
                                                placeholder={"Seleccione un rol"}
                                                className="select-style-suite"
                                                locale={locale}
                                                data={mapListaRoleUser}
                                                inputRef={ref}
                                                onChange={(value, e) => {
                                                    handleChangeRole(value);
                                                    field.onChange(value);
                                                }}
                                                onClean={(value, e) => handleChangeRole(" ")}
                                            />
                                        )}
                                    />
                                    {errors.id_rol && (<p className="error">Campo Requerido</p>)}
                                </div>
                            </div>
                            <button type="submit" className='button-save'>Crear Usuario</button>

                        </form>
                    </div>
                </div>
            </animated.div>

            {/* MODAL AFIRMATIVO */}
            <Modal className="container-modal-aviso loading-post-modal" backdrop={'static'} keyboard={false} open={openPublicando} onClose={handleClose}>
                {nextStepModal == false ?
                    <Modal.Body>
                        <div className="container-text-modal">
                            <p className="text-publicando"><b>Creando usuario</b></p>
                            <span class="loader"></span>
                        </div>
                    </Modal.Body>
                    :
                    <>
                        <Modal.Body>
                            <div className="container-text-modal inline-text">
                                <BsFillCheckCircleFill />
                                <h4>Usuario creado correctamente</h4>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="container-footer">
                            <Button className="boton-cerrar" onClick={handleClose} >
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </>}
            </Modal>
        </>
    )
}
