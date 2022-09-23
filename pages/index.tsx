import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [isThinness, setThinness] = useState(false)
  const [isNormal, setNormal] = useState(false)
  const [isOverWeight, setOverWeight] = useState(false)
  const [isObese, setObese] = useState(false)
  const [isSeverelyObese, setSeverelyObese] = useState(false)

  const { handleSubmit, register } = useForm()

  function handleCalc(data: any) {
    const { peso, altura } = data

    let imc = peso / altura ** 2

    console.log(imc.toFixed(1))
    console.log(isSeverelyObese)

    if (imc < 18.5) {
      setThinness(true)
    }

    if (imc >= 18.5 && imc <= 24.9) {
      setNormal(true)
    }

    if (imc >= 25.0 && imc <= 29.9) {
      setOverWeight(true)
    }

    if (imc >= 30.0 && imc <= 39.9) {
      setObese(true)
    }

    if (imc >= 40.0) {
      setSeverelyObese(true)
    }

    return imc.toFixed(1)
  }

  return (
    <>
      <div className={styles.container}>
        <form action='' onSubmit={handleSubmit(handleCalc)}>
          Altura
          <input type='text' {...register('altura')} />
          Peso
          <input type='text' {...register('peso')} />
          <button type='submit'>Calcular</button>
        </form>

        <table>
          <tr>
            <td>IMC</td>
            <td>Classificação</td>
            <td>Obesidade (grau)</td>
          </tr>

          <tr style={{ color: isThinness ? 'red' : 'none' }}>
            <td>Menor que 18,5</td>
            <td>Magreza</td>
            <td>0</td>
          </tr>

          <tr style={{ color: isNormal ? 'red' : 'none' }}>
            <td>Entre 18,5 e 24,9</td>
            <td>Normal</td>
            <td>0</td>
          </tr>

          <tr style={{ color: isOverWeight ? 'red' : 'none' }}>
            <td>Entre 25,0 e 29,9</td>
            <td>Sobrepeso</td>
            <td>I</td>
          </tr>

          <tr style={{ color: isObese ? 'red' : 'none' }}>
            <td>Entre 30,0 e 39,9</td>
            <td>Obesidade</td>
            <td>II</td>
          </tr>

          <tr style={{ color: isSeverelyObese ? 'red' : 'none' }}>
            <td>Maior que 40,0</td>
            <td>Obesidade Grave</td>
            <td>III</td>
          </tr>
        </table>
        <input disabled>{}</input>
      </div>
    </>
  )
}

export default Home
