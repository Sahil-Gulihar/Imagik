import Image from "next/image";
import Link from "next/link";

export const Cards = () => {
  return (
    <section className="w-full flex bg-uff justify-center py-12 md:py-16 lg:py-20">
      <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-6 xl:max-w-6xl">
        <div className="z-0 relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="rm-bg" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">Fuck You</span>
          </Link>
          <Image
            src="https://cloudfront.slrlounge.com/wp-content/uploads/2019/04/Remove_BG_Adobe_Photoshop_Plugin.jpg"
            alt="Product 1"
            width={400}
            height={300}
            className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              Background remover
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Remove background from your image files
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="/cr" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src="https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png"
            alt="Product 2"
            width={400}
            height={300}
            className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              Universal Resizer
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Resize your image for any social media
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="/meta" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src="https://i.imgur.com/8Xs1TTV.png"
            alt="Product 3"
            width={400}
            height={300}
            className="z-0 object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              Exif Tool
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Find the internal data of image
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="/ocr" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU_gZFYoFAkSxKIaz9WGOtOB7fmO2mEy6J3w&s"
            alt="Product 4"
            width={400}
            height={300}
            className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              OCR tool
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Image Text extraction
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="/t2i" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLuYRgZusCFSDuakrPk-0S4fjnPYonL7nR6A&s"
            alt="Product 5"
            width={400}
            height={300}
            className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              Text to Image
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Make amazing images by using your imagination
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-sheesh transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-lg group">
          <Link href="/qr" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDj-Iidm4xFoy5l68p2zX7IAfntzsyAoSzg&s"
            alt="Product 6"
            width={400}
            height={300}
            className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="p-4">
            <h3 className="text-lg text-white font-semibold md:text-xl">
              QR CODE
            </h3>
            <p className="text-sm text-gray-100 text-muted-foreground">
              Get your QR for image
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cards;
