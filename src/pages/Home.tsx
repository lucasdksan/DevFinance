import React, { useState, FormEvent } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IconEntrada from '../assets/income.svg';
import IconSaid from '../assets/expense.svg';
import IconTotal from '../assets/total.svg';
import IconMinus from '../assets/minus.svg';
import '../styles/pages/Home.css';
import { useEffect } from 'react';

interface Props {
    type: string;
    description: string;
    value: string;
    date: string;
}

const Home = ()=> {
    const [ active, setActive ] = useState('');
    const [ priceValeu, setPriceValue ] = useState('');
    const [ typeElement, setTypeElement ] = useState('');
    const [ descriptionElement, setDescriptionElement ] = useState('');
    const [ dateElement, setDateElement ] = useState('');
    const [ info, setInfo ] = useState<Props[]>([]);
    const [ deletes, setDeletes ] = useState<boolean>(false);
    useEffect(()=>{
        if(Number(priceValeu) < 0.0){
            setTypeElement('expense');
        }
        else{
            setTypeElement('income');
        }
    },[priceValeu]);
    useEffect(()=>{
        setInfo([...info]);
    },[deletes]);
    function calculation(type: string){
        let value = 0.0;
        if(type === 'expense'){
            info.map(itens => {
                if(itens.type === 'expense'){
                    value = value + Number(itens.value);
                }
            });
            return value;
        }
        else if(type === 'income'){
            info.map(itens => {
                if(itens.type === 'income'){
                    value = value + Number(itens.value);
                }
            });
            return value;
        }
        else{
            info.map(itens => {
                value = value + Number(itens.value);
            });
            return value;
        }
    }
    function handleDate(date: string){
        const [ year, month, day ] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    function handleDeleteitem(description: string){
        let search: Props = {
            type: '',
            description: '',
            value: '',
            date: ''
        };
        info.map(itens => {
            if(itens.description === description){
                search = itens;
            }
        });
        let index = info.indexOf(search);
        while(index >= 0){
            info.splice(index,1);
            index = info.indexOf(search);
            setDeletes(!deletes);
        }
        console.log(info);
    }
    function ActiveModal(){
        setActive('active');
    }
    function NotActiveModal(){
        setActive('');
    }
    function SaveElementTable(event: FormEvent){
        event.preventDefault();
        setInfo([
            ...info,{
                type: typeElement,
                description: descriptionElement,
                value: priceValeu,
                date: dateElement,
            }
        ]);
    }
    const ElementTable:React.FC <Props>= ({ date, description, type, value})=>{
        return(
            <tr>
                <td className='description'>{description}</td>
                <td className={type}>R$ {value}</td>
                <td className='date'>{handleDate(date)}</td>
                <td>
                    <img src={IconMinus} className='button-delete' alt="Remover transação" onClick={()=>handleDeleteitem(description)}/>
                </td>
            </tr>
        );
    }
    return(
        <div id='main'>
            <Header/>
            <main className='container'>
                <section id='balance'>
                    <h2 className='sr-only'>Balanço</h2>
                    <Card name='Entrada' value={calculation('income')} image={IconEntrada}/>
                    <Card name='Saídas' value={calculation('expense')} image={IconSaid}/>
                    <Card name='Total' value={calculation('')} addClass='total' image={IconTotal}/>
                </section>
                <section id='transaction'>
                    <h2 className='sr-only'>Transações</h2>
                    <a href='#' className='button new' onClick={ActiveModal}>+ Nova Transação</a>
                    <table id='data-table'>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                info.map(itens => {
                                    return(
                                        <ElementTable
                                            key={itens.type}
                                            date={itens.date}
                                            type={itens.type}
                                            value={itens.value}
                                            description={itens.description}
                                        />
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </main>
            <div className={`modal-overlay ${active}`}>
                <section className='modal'>
                    <div className="form">
                        <h2>Nova Transação</h2>
                        <form onSubmit={SaveElementTable}>
                            <div className="input-group">
                                <label 
                                    htmlFor="description"
                                    className='sr-only'
                                >Description</label>
                                <input 
                                    type="text" 
                                    id='description' 
                                    name='description'
                                    placeholder='Descrição'
                                    onChange={e=>setDescriptionElement(String(e.target.value))}
                                    value={descriptionElement}
                                />
                            </div>
                            <div className="input-group">
                                <label 
                                    htmlFor="amount"
                                    className='sr-only'
                                >Valor</label>
                                <input 
                                    type="number" 
                                    id='amount'
                                    step='0.01'
                                    name='amount'
                                    placeholder='0,00'
                                    onChange={(e) => {setPriceValue(String(e.target.value))}}
                                    value={priceValeu}
                                />
                                <small className='help'>
                                    se o sinal - (negativo) para despesas e, (vírgula) para casas decimais.
                                </small> 
                            </div>
                            <div className="input-group">
                                <label 
                                    htmlFor="date"
                                    className='sr-only'
                                >Data</label>
                                <input 
                                    type="date" 
                                    id='date' 
                                    name='date'
                                    placeholder='Date'
                                    onChange={e => setDateElement(String(e.target.value))}
                                    value={dateElement}
                                />
                            </div>
                            <div className="input-group actions">
                                <a href="#" className="button cancel" onClick={NotActiveModal}>Cancelar</a>
                                <button type='submit'>Salvar</button> 
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;