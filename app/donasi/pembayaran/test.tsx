<div className="relative min-h-screen bg-[url('/images/loading/bg-light.webp')] bg-cover bg-no-repeat dark:bg-[url('/images/loading/bg-dark.webp')] overflow-hidden">
        <NextImage
          serverStaticImg={true}
          src="https://os.ise-its.com/cdn-itdevise/login/side-decoration.png"
          alt="Side Decoration"
          width={1346.5}
          height={365.71}
          className="absolute bottom-0 left-0"
        />

        {/* # <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-rows-1">
        #   <NextImage
        #     serverStaticImg={true}
        #     src="https://os.ise-its.com/cdn-itdevise/login/drop-shadow-green.png"
        #     alt="Decorative Green"
        #     width={216}
        #     height={216}
        #     className="absolute animate-spin top-[3%] left-[7%] w-[92.5px] h-[90px] lg:top-[7%] lg:left-[45%] lg:w-[185px] lg:h-[180px] z-20"
        #   />
        #   <NextImage
        #     serverStaticImg={true}
        #     alt="Decorative Pink"
        #     src="https://os.ise-its.com/cdn-itdevise/login/drop-shadow-pink.png"
        #     width={136}
        #     height={135}
        #     className="col-start-2 absolute animate-spin top-[25%] left-[15%] w-[60px] h-[60px] lg:top-[70%] lg:left-[55%] lg:w-[120px] lg:h-[118px]"
        #   />
        #   <NextImage
        #     serverStaticImg={true}
        #     src="https://os.ise-its.com/cdn-itdevise/login/drop-shadow-yellow.png"
        #     alt="Decorative Yellow"
        #     width={118}
        #     height={200}
        #     className="absolute animate-spin top-[35px] left-[75%] w-[50px] h-[50px] lg:top-[17%] lg:left-[90%] lg:w-[102px] lg:h-[100px]"
        #   />
        #   <NextImage
        #     serverStaticImg={true}
        #     src="https://os.ise-its.com/cdn-itdevise/login/vector-yellow.png"
        #     alt="Decorative Vector Yellow"
        #     width={500}
        #     height={500}
        #     className="absolute animate-pulse top-[24%] left-[80%] w-[45px] h-[45px] lg:top-[72%] lg:left-[87%] lg:w-[150px] lg:h-[150px]"
        #   />
        # </div> */}

        {/* Flex layout semua konten */}
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-rows-1 lg:flex-row min-h-screen lg:p-10 justify-center items-center">
          {/* Logo + Text */}
          <div className="flex flex-col items-center justify-center w-full mt-4 lg:order-2 lg:pl-10">
            <NextImage
              serverStaticImg={true}
              src="https://os.ise-its.com/cdn-itdevise/login/logo-light.webp"
              width={441}
              height={400}
              alt="Logo Light"
              className="lg:w-[219px] lg:h-[196px] w-[120px] h-[120px] dark:hidden"
            />
            <NextImage
              serverStaticImg={true}
              src="https://os.ise-its.com/cdn-itdevise/login/logo-dark.webp"
              width={441}
              height={400}
              alt="Logo Dark"
              className="hidden lg:w-[219px] lg:h-[196px] w-[120px] h-[120px] dark:block"
            />
            <div className="text-white text-center">
              <div>
                <Typography
                  as="span"
                  variant="h4"
                  className="text-xl text-blue-light-1 dark:text-blue-dark-1"
                >
                  <span className="font-lynowalt">U</span>
                  <span className="font-geist">NVEIL</span>
                  <span className="font-lynowalt">T</span>
                  <span className="font-geist">HE</span>
                </Typography>
              </div>
              <div>
                <Typography
                  as="span"
                  variant="h4"
                  className="text-xl text-blue-light-1 dark:text-blue-dark-1"
                >
                  <span className="font-lynowalt">U</span>
                  <span className="font-geist">NKO</span>
                  <span className="font-lynowalt">W</span>
                  <span className="font-geist">N</span>
                </Typography>
              </div>
            </div>
          </div>

          {/* Form Login */}
          <div className="bg-white flex flex-col justify-center row-span-3 lg:row-span-1 rounded-t-2xl lg:rounded-2xl shadow-xl p-[50px] w-full h-full lg:h-fit z-10 lg:order-1">
            {/* Judul Sign Up */}
            <Typography
              as="div"
              className="lg:text-5xl text-2xl p-1"
              variant="h4"
            >
              <Link href="/">
                <button type="button" className="text-sm mb-4 text-black flex">
                  &larr; Kembali
                </button>
              </Link>
              <div className="flex justify-center lg:justify-start text-black text-[40px] py-10">
                <span className="font-lynowalt ">L</span>
                <span className="font-geist font-bold mr-2">og </span>
                <span className="font-geist font-bold">In</span>
              </div>
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Field Email */}
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Masukkan alamat email anda"
                  validation={{
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Format email tidak valid",
                    },
                  }}
                  {...register("email")}
                />
              </div>

              {/* Field Password */}
              <div className="space-y-1">
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Masukkan password anda"
                  validation={{
                    required: "Password wajib diisi",
                  }}
                  {...register("password")}
                />
              </div>

              <div className="flex justify-between items-center w-full">
                {/* Kiri: Checkbox + Ingatkan saya */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={() => setRemember(!remember)}
                    className="w-4 h-4 border rounded"
                  />
                  <label htmlFor="remember">
                    <Typography className="text-gray-400 font-sm font-geist">
                      Ingat saya
                    </Typography>
                  </label>
                </div>

                {/* Kanan: Lupa sandi */}
                <div>
                  <Typography className="text-gray-400 font-geist font-sm  hover:underline">
                    <a href="/auth/forgot-password">Lupa sandi?</a>
                  </Typography>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full dark:bg-blue-light-7 bg-blue-dark-5 text-white hover:bg-blue-light-4 py-2 rounded-lg"
              >
                {isLoading ? "Loading..." : "Masuk"}
              </Button>

              <Typography
                variant="body"
                className="text-sm text-center mt-2 text-gray-900"
              >
                Belum punya akun?{" "}
                <Link
                  href="register"
                  className="text-sm text-blue-600 font-medium"
                >
                  Daftar
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>