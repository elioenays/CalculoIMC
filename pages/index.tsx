import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const title = 'Calcular IMC'

  const [isThinness, setThinness] = useState(false)
  const [isNormal, setNormal] = useState(false)
  const [isOverWeight, setOverWeight] = useState(false)
  const [isObese, setObese] = useState(false)
  const [isSeverelyObese, setSeverelyObese] = useState(false)
  const [imc, setImc] = useState(0)

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  })

  function handleCalc(data: any) {
    const { peso, altura } = data

    let imc = peso / altura ** 2

    setImc(imc)

    if (imc <= 18.5) {
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
      <div className='min-h-screen flex items-center flex-col justify-center bg-gray-100'>
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{title}</h1>

        <form
          onSubmit={handleSubmit(handleCalc)}
          className='mt-8 space-y-6'
          id='form'
        >
          <div>
            <div>
              <input
                type='text'
                required
                {...register('altura')}
                className='w-52 rounded-lg border-blue-600 text-blue-600'
                placeholder='Digite a Altura'
              />

              <input
                type='text'
                {...register('peso')}
                className='w-52 ml-2 rounded-lg border-blue-600 text-blue-600'
                placeholder='Digite o Peso'
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-52 h-10 font-semibold rounded-lg text-white bg-blue-600'
            >
              Calcular
            </button>
            <button
              type='button'
              className='w-52 h-10 ml-2 font-semibold rounded-lg text-white bg-red-600'
            >
              Limpar
            </button>
          </div>
          <input
            type='text'
            value={imc.toFixed(1)}
            disabled
            className='text-center w-424px rounded-lg border-blue-600 text-white bg-blue-600'
          />
        </form>

        <table className='table-auto text-center mt-8'>
          <thead>
            <tr>
              <th className='text-left'>IMC</th>
              <th>Classificação</th>
              <th>Obesidade (grau)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: isThinness ? '#0061e6' : 'none' }}>
              <td className='text-left'>Menor que 18,5 </td>
              <td>Magreza</td>
              <td>0</td>
            </tr>

            <tr style={{ color: isNormal ? '#0061e6' : 'none' }}>
              <td className='text-left'>Entre 18,5 e 24,9 </td>
              <td>Normal</td>
              <td>0</td>
            </tr>

            <tr style={{ color: isOverWeight ? '#0061e6' : 'none' }}>
              <td className='text-left'>Entre 25,0 e 29,9 </td>
              <td>Sobrepeso</td>
              <td>I</td>
            </tr>

            <tr style={{ color: isObese ? '#0061e6' : 'none' }}>
              <td className='text-left'>Entre 30,0 e 39,9 </td>
              <td>Obesidade</td>
              <td>II</td>
            </tr>

            <tr style={{ color: isSeverelyObese ? '#0061e6' : 'none' }}>
              <td className='text-left'>Maior que 40,0 </td>
              <td>Obesidade Grave</td>
              <td>III</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
