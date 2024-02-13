<div>
    <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-200 dark:text-gray-800">
                <tr>
                    <th scope="col" className="p-3">Id</th>
                    <th scope="col" className="px-6 py-3">Título</th>
                    <th scope="col" className="px-6 py-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(noticia => (
                    <React.Fragment key={noticia.id}>
                        <tr className="bg-white border-b dark:bg-slate-100">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-800">{noticia.id}</td>
                            <td className="px-6 py-4">{noticia.titulo}</td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                                    onClick={() => NoticiaSet(noticia, "Editar")}>
                                    Editar
                                </button>

                                <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    onClick={() => NoticiaSet(noticia, "Excluir")}>
                                    Excluir
                                </button>

                                <button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => NoticiaSet(noticia, "Visualizar")}>
                                    Visualizar
                                </button>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}

            </tbody>
        </table>
    </div>

    <div className="float-right flex-auto py-14">
        <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => abrirFecharModalInserir()}
        >Cadastrar</button>
    </div> 
</div>