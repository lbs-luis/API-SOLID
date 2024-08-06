import { ProductsRepository } from "@/repositories/products/products-repository"
import { DeleteProductService } from "@/use-cases/delete-product/delete-product"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function deleteProduct(request: FastifyRequest, response: FastifyReply) {
  try {
    const registBodySchema = z.object({
      product_custom_id: z.string(),
    })
    const { product_custom_id } = registBodySchema.parse(request.body)
    const deleteProductService = new DeleteProductService(new ProductsRepository())
    await deleteProductService.execute({ product_custom_id })

    response.status(200).send({})
  } catch (err) {
    if (err instanceof InvalidCredentialsError || err instanceof ResourceNotFoundError) { response.status(500).send({ error: err.message }) }
    throw err
  }
}