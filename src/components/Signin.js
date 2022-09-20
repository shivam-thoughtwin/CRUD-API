import React from 'react'
import '../App.css'

const Signin = () => {
    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="inputAddress">Email Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Email Address" />
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Password</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin