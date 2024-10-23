//import { Link } from "@remix-run/react";
export default function dashboard() {
    return (
        <main id="dashboard">
            <header id="top">
                <div id="left">
                    <svg width="210" height="65" viewBox="0 0 210 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.9942 26.9667C48.6781 24.0404 54.8473 25.4653 57.7736 30.1492L59.3535 32.6781C62.2798 37.362 60.8549 43.5312 56.171 46.4575L50.4991 50.001C47.551 51.8428 43.6681 50.946 41.8263 47.9979C39.9844 45.0498 36.1015 44.153 33.1534 45.9948L28.3983 48.9655C23.7144 51.8917 17.5452 50.4668 14.619 45.783L13.039 43.254C10.1128 38.5701 11.5376 32.4009 16.2215 29.4746L19.666 27.3227C22.7014 25.4263 23.6248 21.4283 21.7284 18.3929C19.8321 15.3575 20.7555 11.3595 23.7909 9.46311L29.3046 6.01841C33.9885 3.09216 40.1578 4.51702 43.084 9.20091L44.664 11.7298C47.5902 16.4137 46.1653 22.583 41.4814 25.5092L33.6295 30.4147C33.0283 30.7903 32.8454 31.5823 33.221 32.1835C33.5967 32.7848 34.3886 32.9677 34.9899 32.5921L43.9942 26.9667Z" fill="#1A3FE5" />
                        <path d="M86.18 29.38H88.4C89.98 29.38 90.68 28.6 90.68 27.36C90.68 26.08 89.98 25.32 88.4 25.32H86.18V29.38ZM93.56 27.36C93.56 29.48 92.12 31.64 88.52 31.64H86.18V37H83.38V23.04H88.52C91.88 23.04 93.56 24.94 93.56 27.36ZM98.348 31.48V37H95.548V25.92H98.348V27.64C99.048 26.5 100.208 25.76 101.748 25.76V28.7H101.008C99.348 28.7 98.348 29.34 98.348 31.48ZM114.334 31.46C114.334 34.94 111.774 37.18 108.554 37.18C105.354 37.18 102.934 34.94 102.934 31.46C102.934 27.96 105.434 25.74 108.634 25.74C111.834 25.74 114.334 27.96 114.334 31.46ZM105.774 31.46C105.774 33.66 107.054 34.74 108.554 34.74C110.034 34.74 111.454 33.66 111.454 31.46C111.454 29.24 110.074 28.18 108.594 28.18C107.114 28.18 105.774 29.24 105.774 31.46ZM117.808 24.6C116.788 24.6 116.068 23.88 116.068 22.96C116.068 22.04 116.788 21.32 117.808 21.32C118.788 21.32 119.508 22.04 119.508 22.96C119.508 23.88 118.788 24.6 117.808 24.6ZM116.388 25.92H119.188V38.82C119.188 41.38 117.808 42.28 115.668 42.28H114.428V39.9H115.228C116.088 39.9 116.388 39.58 116.388 38.84V25.92ZM126.714 28.04C125.374 28.04 124.314 28.9 124.094 30.42H129.354C129.314 28.96 128.154 28.04 126.714 28.04ZM131.974 33.52C131.374 35.56 129.534 37.18 126.794 37.18C123.574 37.18 121.234 34.94 121.234 31.46C121.234 27.96 123.514 25.74 126.794 25.74C129.994 25.74 132.254 27.92 132.254 31.22C132.254 31.58 132.234 31.94 132.174 32.3H124.074C124.214 33.94 125.334 34.86 126.734 34.86C127.934 34.86 128.594 34.26 128.954 33.52H131.974ZM133.578 31.46C133.578 27.98 135.858 25.74 139.058 25.74C141.818 25.74 143.678 27.18 144.278 29.66H141.258C140.938 28.72 140.198 28.12 139.038 28.12C137.478 28.12 136.438 29.3 136.438 31.46C136.438 33.62 137.478 34.78 139.038 34.78C140.198 34.78 140.918 34.26 141.258 33.26H144.278C143.678 35.62 141.818 37.18 139.058 37.18C135.858 37.18 133.578 34.94 133.578 31.46ZM146.769 33.56V28.22H145.449V25.92H146.769V23.18H149.589V25.92H152.069V28.22H149.589V33.58C149.589 34.32 149.889 34.64 150.769 34.64H152.069V37H150.309C148.189 37 146.769 36.1 146.769 33.56ZM168.329 37L167.409 34.34H161.849L160.929 37H157.989L163.009 23.02H166.269L171.289 37H168.329ZM166.649 32.1L164.629 26.26L162.609 32.1H166.649ZM172.485 30C172.485 25.82 175.545 22.86 179.565 22.86C182.665 22.86 185.185 24.52 186.125 27.38H182.905C182.245 26.04 181.045 25.38 179.545 25.38C177.105 25.38 175.365 27.16 175.365 30C175.365 32.82 177.105 34.62 179.545 34.62C181.045 34.62 182.245 33.96 182.905 32.6H186.125C185.185 35.48 182.665 37.12 179.565 37.12C175.545 37.12 172.485 34.18 172.485 30ZM196.617 23.02V25.3H191.317V28.8H196.017V31.02H191.317V34.72H196.617V37H188.517V23.02H196.617ZM208.921 32.96C208.921 35.16 207.161 37.14 203.981 37.14C201.081 37.14 198.841 35.62 198.801 32.98H201.801C201.881 34.1 202.621 34.84 203.921 34.84C205.241 34.84 206.021 34.14 206.021 33.14C206.021 30.12 198.821 31.94 198.841 26.88C198.841 24.36 200.881 22.84 203.761 22.84C206.621 22.84 208.581 24.3 208.761 26.82H205.681C205.621 25.9 204.881 25.18 203.681 25.16C202.581 25.12 201.761 25.66 201.761 26.8C201.761 29.6 208.921 28.04 208.921 32.96Z" fill="#202020" />
                    </svg>
                </div>

                <div id="right">
                    <div id="search_bar">
                        <form action="">
                            <input type="text" placeholder="Search for a course" />
                            <button type="submit"> Search</button>
                        </form>
                    </div>
                    <div id="notification">
                        <img src="/notification.png" alt="notification" />
                    </div>
                    < div id="user">
                    <div id="avatar">
                    <img src="/notification.png" alt="avatar"  id="avatar_img"/>
                    </div>
                    <div id ="dropdown">
                    <button><svg height="5px" width="10px"  id="drop-btn" >
                        <polyline points= "0,0 5,5 10,0" />
                        </svg>
                        </button>
                        <div id="dropdown-content">
                            <ul>
                        <li><a href="profile">Profile</a></li>
                       <li> <a href="log-out">Log out</a></li>
                        </ul>
                        </div>

                        </div>
                    </div>
                </div>
            </header><hr />
            <section id="down">
                <div id="db_left">
                    <ul>
                        <li><h2> Courses</h2></li>
                        <li><h2>Enrolled Courses</h2></li>
                        <li><h2>Resources</h2></li>
                        <li><h2>Messages</h2></li>
                        <li><h2>Events</h2></li>
                    </ul>

                </div>

                <div id="courses">
                    <h2 >Courses</h2>
                    <div id="manual">

                        <table>
<td>
    <tr><div id="note">
                            <div id="note_img">
                            </div><p><b>Computer circuit and component <br /> CPE211  <br/>2.0 hours<br/></b>
                            Engr. Udoh Udofia<br/>
                            <progress value="65" max="100"></progress>
                            </p>

                            
                        </div></tr>
    <tr><div id="note">
                            <div id="note_img">
                            </div><p><b>Computer circuit and component <br /> CPE211  <br/>2.0 hours<br/></b>
                            Engr. Udoh Udofia<br/>
                            <progress value="65" max="100"></progress>
                            </p>
                            
                        </div></tr>
</td>
<td>
    <tr><div id="note">
                            <div id="note_img">
                            </div><p><b>Computer circuit and component <br /> CPE211  <br/>2.0 hours <br/></b>
                        Engr. Udoh Udofia<br/>
                        <progress value="65" max="100"></progress></p>

                        </div></tr>
    <tr><div id="note">
                            <div id="note_img">
                            </div><p><b>Computer circuit and component <br /> CPE211  <br/>2.0 hours<br/></b>
                            Engr. Udoh Udofia<br/>
                            <progress value="65" max="100"></progress>
                            </p>
                           
                        </div></tr>
</td>

                        </table>
                        


                    </div>

                </div>

                <div id="db_right">
                    <div id="calender">

                    <h2 > December, 2022
                        <nav>
                    <svg height="5px" width="10px"  id="btn-left" >
                        <polyline points= "0,0 5,5 10,0" />
                        </svg>
                    <svg height="5px" width="10px"  id="btn-right" >
                        <polyline points= "0,0 5,5 10,0" />
                        </svg>
                        </nav>
                         </h2>
   <table  id="calender_table">
      <thead>
         <tr>
            <th id="weekend"> Sun</th>
            <th> Mon</th>
            <th> Tue</th>
            <th> Wed</th>
            <th> Thu</th>
            <th> Fri</th>
            <th id="weekend"> Sat</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>1</td>
            <td>2</td>
            <td id="weekend">3</td>
         </tr>
         <tr></tr>
         <tr>
            <td id="weekend">4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td id="weekend">10</td>
         </tr>
         <tr>
            <td id="weekend">11</td>
            <td >12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td id="weekend">17</td>
         </tr>
         <tr>
            <td id="weekend">18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td id="weekend">24</td>
         </tr>
         <tr>
            <td id="weekend">25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
            <td id="weekend">31</td>
         </tr>
      </tbody>
   </table>

                    </div>

                    <div id="event">
                        <p>Events</p><hr />
                    </div>
                </div>
            </section>
        </main>
    );
}