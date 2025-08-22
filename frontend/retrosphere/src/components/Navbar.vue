<template>
  <nav id="navbar" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">Retrosphere</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Dropdown 1
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Dropdown 2
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action A</a></li>
              <li><a class="dropdown-item" href="#">Action B</a></li>
              <li><a class="dropdown-item" href="#">Action C</a></li>
            </ul>
          </li>
        </ul>
        <button type="button" class="btn" id="login">Login</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#navbar {
  background-color: #306230 !important;
  padding: 10px;
  border-radius: 10px;
  font-family: "Pixelify Sans", sans-serif;
}
#login{
  background-color: #9bbc0f;
}
</style>
