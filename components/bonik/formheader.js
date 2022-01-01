import formheaderstyles from './formheader.module.css';

export default function FormHeader({title, button}) {
    return (
        <div className={formheaderstyles.formheader_head_container}>
            <div className={formheaderstyles.formheader_head_wrapper}>
                <div className={formheaderstyles.formheader_title_wrapper}>
                    <h2 className={formheaderstyles.formheader_title}>{title}</h2>
                </div>
                <button className={`${formheaderstyles.formheader_button} red`}>{button}</button>
            </div>
        </div>
    )
}