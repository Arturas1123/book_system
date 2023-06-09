import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import '/resources/css/my.css';

export default function Create({categorys, book}) {

    // console.log(props.categorys);
    // console.log(props.book);

    const {data, setData, post, errors}=useForm({
        ...book,
        _method: 'put'
    });

    console.log(data);

    const categorysList=[];
    categorysList.push(<option key={0} value={""}></option>);
    categorys.forEach((category)=>{
        categorysList.push(
            <option key={category.id} value={category.id}>{category.name}</option>
        )
    })



    const handleChange=(event)=>{
        console.log(event);
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        post(route("books.update", data.id));
    }

    return (
        <AppLayout>
                <div className={"col-md-12 mt-5"}>
                    <div className={"card"}>
                        <div className={"card-header"}>Redaguoti knygą</div>
                        <div className={"card-body"}>
                            <form onSubmit={handleSubmit}>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Pavadinimas</label>
                                    <input type={"text"} className={"form-control "+(errors.name!=null?" is-invalid":"")} id={"name"} onChange={handleChange} value={data.name}/>
                                    <div className={"invalid-feedback"}>{errors.name}</div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nuotrauka</label>
                                    <input className="form-control" type="file" id="picture" name="picture" onChange={(event)=>{
                                        setData({
                                            ...data,
                                            picture:event.target.files[0]
                                        });
                                    }} />
                                </div>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Santrauka</label>
                                    <input type={"text"} className={"form-control "+(errors.summary!=null?" is-invalid":"")} id={"summary"} onChange={handleChange} value={data.summary}/>
                                    <div className={"invalid-feedback"}>{errors.summary}</div>
                                </div>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>ISBN</label>
                                    <input type={"text"} className={"form-control "+(errors.isbn!=null?" is-invalid":"")} id={"isbn"} onChange={handleChange} value={data.isbn}/>
                                    <div className={"invalid-feedback"}>{errors.isbn}</div>
                                </div>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Puslapių skaičius</label>
                                    <input type={"text"} className={"form-control "+(errors.pages!=null?" is-invalid":"")} id={"pages"} onChange={handleChange} value={data.pages}/>
                                    <div className={"invalid-feedback"}>{errors.pages}</div>
                                </div>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Kategorija</label>
                                    <select className={"form-select" +(errors.category_id!=null?" is-invalid":"")} id={"category_id"} onChange={handleChange}>
                                        {categorysList}
                                    </select>
                                    <div className={"invalid-feedback"}>{errors.category_id}</div>
                                </div>
                                <button type={"submit"} className={"btn btn-success"}>Išsaugoti</button>
                            </form>
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}
