import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Axios from 'axios'
import { Card, CardContent, CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'



const Posts = () => {
    const [posts, setposts] = useState([])
    useEffect(()=>{
        Axios.get('/posts')
        .then(res=>{
            setposts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div>
            <Navbar title="All Post"/>
            <div className="post container">
                <div className="col-md-8 offset-md-2">
                    <div className="row mt-5">
                        {
                            posts.reverse().map(single=>{
                                return (
                                    <div className="col-12 mb-5">
                                        <Card className="p-3">
                                            <CardContent>
                                                <h3>{single.title}</h3>
                                                <p>{single.summary}</p>
                                                <p> <strong>Author : </strong> {single.author} </p>
                                                <p>
                                                    <strong>Date</strong> {single.date_published?single.date_published?.split('T')[0]:''}
                                                    <strong> Time:</strong>  {single.date_published?(single.date_published.split('T')[1]).split('.')[0]:''}  
                                                </p>
                                                <div className="mt-0">
                                                    <Link to={`/edit-post/?id=${single._id}`}>
                                                        <Button  variant="contained" color="danger" className="mr-5 mt-5 ">Edit</Button>
                                                    </Link>
                                                   
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts