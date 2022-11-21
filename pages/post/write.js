import Head from 'next/head'
import { useRef } from 'react'
import Layout from '../../components/layout'

export default function Write() {
  const nameRef = useRef()
  const phoneNbrRef = useRef()
  const addressRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target)
    console.log(
      nameRef.current.value,
      phoneNbrRef.current.value,
      addressRef.current.value
    )

    const res = await fetch('/api/post/write', {
      method: 'POST', // *GET, POST, PUT, DELETE 등
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id: nameRef.current.value,
        title: phoneNbrRef.current.value,
        content: addressRef.current.value,
      }),
    })
    let json
    if (res.ok) {
      json = await res.json()
    } else {
      throw new Error('failed to create post')
    }

    console.log(json)
  }
  return (
    <Layout>
      <Head>
        <title>포스트 작성 페지</title>
      </Head>
      <article>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="이름" ref={nameRef} />
          </div>
          <div className="form-row">
            <input type="tel" placeholder="핸드폰번호" ref={phoneNbrRef} />
          </div>
          <div className="form-row">
            <input type="text" placeholder="주소" ref={addressRef} />
          </div>
          <input type="submit" value="제출" />
        </form>
      </article>
      <style jsx scoped>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </Layout>
  )
}
