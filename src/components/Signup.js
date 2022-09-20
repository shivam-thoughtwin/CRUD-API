import React from 'react'

const Signup = () => {
    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                    <div class="card-body">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">First Name</label>
                                    <input type="email" class="form-control" id="inputEmail4" placeholder="First Name" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Last Name</label>
                                    <input type="password" class="form-control" id="inputPassword4" placeholder="Last Name" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Email Address</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Email Address" />
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Password</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup