import {useState} from "react";
import useFormValidation from "../hooks/useFormValidation";

function Form() {
    const validationRules = {
        Age: { required: true, pattern: /^[0-9]+$/ },
        ALB: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        ALP: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        ALT: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        AST: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        BIL: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        CHE: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        CHOL: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        CREA: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        GGT: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        PROT: { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ },
        isMale: { required: true},
    };
    const [showAlert, setShowAlert] = useState(false);
    const initialState = {
        Age: '',
        ALB: '',
        ALP: '',
        ALT: '',
        AST: '',
        BIL: '',
        CHE: '',
        CHOL: '',
        CREA: '',
        GGT: '',
        PROT: '',
        isMale: ''
    };

    // const [form, setForm] = useState({
    //     Age: '',
    //     ALB: '',
    //     ALP: '',
    //     ALT: '',
    //     AST: '',
    //     BIL: '',
    //     CHE: '',
    //     CHOL: '',
    //     CREA: '',
    //     GGT: '',
    //     PROT: '',
    //     isMale: null
    // });

    const { values, errors, handleChange, validateForm } = useFormValidation(
        initialState,
        validationRules
    );

    const handleForm = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            try {
                const response = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    mode: "cors",
                    body: JSON.stringify(values),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch prediction');
                }

                const data = await response.json();
                alert(data.prediction);
            } catch (error) {
                console.error('An error occurred:', error.message);
                // Display an error message to the user
                alert('An error occurred. Please try again later.');
            }
        } else {
            setShowAlert(true); // Display alert if form is invalid
        }
    };

    return (
        <div>
            <div>
                {showAlert && (
                    <div className="alert alert-danger" role="alert" style={{ color: 'red' }}>
                        Form không hợp lệ. Mời nhập lại.
                    </div>
                )}
            </div>

            <div>
                <form onSubmit={handleForm}>
                    <div>
                        <label htmlFor="Age">Tuổi:</label>
                        <br />
                        <input
                            type="text"
                            name="Age"
                            value={values.Age}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ALB">ALB (G/L):</label>
                        <br />
                        <input
                            type="text"
                            name="ALB"
                            value={values.ALB}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ALP">ALP (IU/L):</label>
                        <br />
                        <input
                            type="text"
                            name="ALP"
                            value={values.ALP}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ALT">ALT (U/L):</label>
                        <br />
                        <input
                            type="text"
                            name="ALT"
                            value={values.ALT}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="AST">AST (U/L):</label>
                        <br />
                        <input
                            type="text"
                            name="AST"
                            value={values.AST}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="BIL">BIL (μmol/L):</label>
                        <br />
                        <input
                            type="text"
                            name="BIL"
                            value={values.BIL}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="CHE">CHE (U/mL):</label>
                        <br />
                        <input
                            type="text"
                            name="CHE"
                            value={values.CHE}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="CHOL">CHOL (mmol/L):</label>
                        <br />
                        <input
                            type="text"
                            name="CHOL"
                            value={values.CHOL}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="CREA">CREA (µmol/L):</label>
                        <br />
                        <input
                            type="text"
                            name="CREA"
                            value={values.CREA}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="GGT">GGT (IU/L):</label>
                        <br />
                        <input
                            type="text"
                            name="GGT"
                            value={values.GGT}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="PROT">PROT (g/L):</label>
                        <br />
                        <input
                            type="text"
                            name="PROT"
                            value={values.PROT}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="isMale">Giới tính:</label>
                        <br />
                        <select id="gender" name="isMale" value={values.isMale} onChange={handleChange}>
                            <option value="">Chọn</option>
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                        </select>
                    </div>
                    <br />
                    <button type='submit'>Submit</button>
                </form>
            </div>

            {/*<div>*/}
            {/*    Form*/}
            {/*    <form onSubmit={handleForm}>*/}
            {/*        Tuổi:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={values.Age}*/}
            {/*            onChange={(e) => setForm({...form, Age: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        ALB:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.ALB}*/}
            {/*            onChange={(e) => setForm({...form, ALB: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        ALP:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.ALP}*/}
            {/*            onChange={(e) => setForm({...form, ALP: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        ALT:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.ALT}*/}
            {/*            onChange={(e) => setForm({...form, ALT: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        AST:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.AST}*/}
            {/*            onChange={(e) => setForm({...form, AST: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        BIL:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.BIL}*/}
            {/*            onChange={(e) => setForm({...form, BIL: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        CHE:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.CHE}*/}
            {/*            onChange={(e) => setForm({...form, CHE: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        CHOL:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.CHOL}*/}
            {/*            onChange={(e) => setForm({...form, CHOL: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        CREA:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.CREA}*/}
            {/*            onChange={(e) => setForm({...form, CREA: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        GGT:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.GGT}*/}
            {/*            onChange={(e) => setForm({...form, GGT: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        PROT:*/}
            {/*        <br />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={form.PROT}*/}
            {/*            onChange={(e) => setForm({...form, PROT: e.target.value})}*/}
            {/*        />*/}
            {/*        <br />*/}
            {/*        Giới tính*/}
            {/*        <br />*/}
            {/*        <select id="gender" onChange={(e) => setForm({...form, isMale: e.target.value === 'true'})}>*/}
            {/*            <option value="">Select</option>*/}
            {/*            <option value="true">Nam</option>*/}
            {/*            <option value="false">Nu</option>*/}
            {/*        </select>*/}
            {/*        <br />*/}
            {/*        <button type='submit'>Submit</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    );
}

export default Form;
